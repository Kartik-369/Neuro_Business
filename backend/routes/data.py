from ast import Await, Return
from fastapi import APIRouter,UploadFile,File,HTTPException
import pandas as pd
import os
import shutil

router = APIRouter()

@router.post('/upload')
async def upload_file(file:UploadFile=File(...)):

    os.makedirs('upload_files',exist_ok=True)
    file_location=f"upload_files/{file.filename}"
    with open(file_location,'wb') as buffer:
        shutil.copyfileobj(file.file,buffer)

    content= await file.read()
    
    return{
        'filename':file.filename,
        'size':len(content),
        'message':'File received successfully!'
    }


@router.get('/columns')
async def get_cols():
    folder='uploaded_files'

    if not os.path.exists(folder):
        return {'error':'no file upload'}

    files = os.listdir(folder)
    if not files:
        return {'error':'no files found'}

    latest_file=max([os.path.join(folder,f) for f in files], key=os.path.getctime)

    try:
        if latest_file.endswith('.csv'):
            df=pd.read_csv(latest_file)
        elif latest_file.endswith('.xlsx'):
            df=pd.read_excel(latest_file)
        else:
            return {'error':'file not supported'}

        return{
            'filename':os.path.basename(latest_file),
            'columns':list(df.columns),
            'preview':df.head(5).to_dict(orient='records')
        }
    except Exception as e:
        return {'error':str(e)}