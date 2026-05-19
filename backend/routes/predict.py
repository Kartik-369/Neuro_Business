from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException
from dotenv import load_dotenv
import os
from datetime import datetime
from database import projects_collection
import pandas as pd
import joblib
import shap
import numpy as np
import io
from bson import ObjectId
from jose import jwt, JWTError
from routes.user import oauth2_scheme
from pydantic import BaseModel
from google import genai

class StrategyRequest(BaseModel):
    customer_id: str
    risk_score: int
    reasons: list[str]

router = APIRouter() 
ai_nb = joblib.load('./ml-models/neuro_business_brain.pkl')
explainer = shap.TreeExplainer(ai_nb)
load_dotenv()
KEY=os.getenv("API_KEY")
SECRET_KEY=os.getenv("SECRET_KEY")
ALGORITHM=os.getenv("ALGORITHM")
client = genai.Client(api_key=KEY)
@router.post("/predict")
async def predict(file: UploadFile = File(...), project_name: str = Form(...), token: str = Depends(oauth2_scheme)):
    try:
        key = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_email = key.get('sub')
        if user_email is None:
            raise HTTPException(status_code=401, detail="Invalid token")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    content = await file.read()
    predict_df = pd.read_csv(io.BytesIO(content))
    customer_ids = predict_df['customerID'].tolist()
    predict_df['TotalCharges'] = pd.to_numeric(predict_df['TotalCharges'], errors='coerce').fillna(0)
    predict_df['ChargeRatio'] = predict_df['TotalCharges'] / (predict_df['tenure'] + 1)
    predict_df.drop(columns=['customerID', 'gender'], inplace=True, errors='ignore')
    predict_df = pd.get_dummies(predict_df, columns=['Partner','Dependents','PhoneService','MultipleLines','InternetService','OnlineSecurity','OnlineBackup','DeviceProtection','TechSupport','StreamingTV','StreamingMovies','Contract','PaperlessBilling','PaymentMethod'], dtype=int)
    expected_columns = ai_nb.feature_names_in_
    predict_df = predict_df.reindex(columns=expected_columns, fill_value=0)
    prediction = ai_nb.predict(predict_df)
    risk_prob = ai_nb.predict_proba(predict_df)
    shap_values = explainer.shap_values(predict_df)
    if isinstance(shap_values, list):
        shap_values_churn = shap_values[1] 
    else:
        shap_values_churn = shap_values
    top_reasons_list = []
    feature_names = predict_df.columns.tolist()
    for i in range(len(predict_df)):
        customer_shap = shap_values_churn[i]
        top_indices = np.argsort(customer_shap)[-3:][::-1] 
        customer_reasons = []
        for idx in top_indices:
            if customer_shap[idx] > 0:
                feature = feature_names[idx]
                val = predict_df.iloc[i, idx]
                if "_" in feature and val == 1:
                    clean_feature = feature.replace("_", ": ")
                    customer_reasons.append(f"{clean_feature}")
                elif "_" not in feature:
                    customer_reasons.append(f"{feature} is {round(val, 2)}")
        if not customer_reasons:
            customer_reasons.append("Customer profile is highly stable.")
        top_reasons_list.append(customer_reasons)
        
    analysis_results = {
        'predictions': prediction.tolist(),
        'risk': risk_prob.tolist(),
        'customer_ids': customer_ids,
        'reasons': top_reasons_list
    }
    new_project = {
        'user_email': user_email,
        'project_name': project_name,
        'analysis_results': analysis_results,
        'created_at': datetime.now()
    }
    new_result=await projects_collection.insert_one(new_project)
    new_project['_id']=str(new_result.inserted_id)
    return new_project

@router.get('/projects')
async def catch_projects(token:str=Depends(oauth2_scheme)):
    try:
        key=jwt.decode(token,SECRET_KEY,algorithms=[ALGORITHM])
        user_email=key.get('sub')
        if not user_email:
            raise HTTPException(status_code=400,detail='invalid')
    except Exception as e:
        print(f"JWT Decode Error: {e}")
        raise HTTPException(status_code=401,detail='invalid')
    cursor=projects_collection.find({'user_email':user_email}).sort('created_at',-1)
    projects=await cursor.to_list(length=100)
    for project in projects:
        project['_id'] = str(project['_id'])
    return projects

@router.delete("/projects/{project_id}")
async def delete_project(project_id:str,token:str=Depends(oauth2_scheme)):
    try:
        key=jwt.decode(token,SECRET_KEY,algorithms=[ALGORITHM])
        user_email=key.get('sub')
    except JWTError:
        raise HTTPException(status_code=401,detail="expired token")
    result=await projects_collection.delete_one({
        '_id':ObjectId(project_id), 
        'user_email':user_email
    })
    if result.deleted_count==0:
        raise HTTPException(status_code=404,detail="not authorized")
    return {"message":"Project deleted"}

@router.post('/strategy')
async def strategy(data:StrategyRequest,token:str=Depends(oauth2_scheme)):
    try:
        jwt.decode(token,SECRET_KEY,algorithms=[ALGORITHM])
    except JWTError:
        raise HTTPException(status_code=401,detail='invalid token')
    prompt=f"""
    You are an expert Customer Success Manager at a SaaS company.
    I have a customer named {data.customer_id} who has a {data.risk_score}% risk of churning
    Here are the top reasons our Machine Learning model flagged them:
    {', '.join(data.reasons)}
    Write a highly concise, professional, 3-step action plan to save this customer. 
    Keep it under 4 sentences total. Do not use pleasantries, just give me the strategy
    """
    try:
        response = client.models.generate_content(model='gemini-2.5-flash',contents=prompt)
        return {"strategy": response.text}
    except Exception as e:
        print("Gemini Error:", e)
        raise HTTPException(status_code=500, detail="AI generation failed")