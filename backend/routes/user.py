from warnings import deprecated
from fastapi import APIRouter,HTTPException
from models import UserCreate
from database import users_collection
from passlib.context import CryptContext

router=APIRouter()

pwd_context=CryptContext(schemes=["bcrypt"],deprecated='auto')

@router.post('/register')
async def register_users(user:UserCreate):
    user_exist=await users_collection.find_one({'email':user.email})
    if user_exist:
        raise HTTPException(status_code=400,detail='auto')
    
    hashed_password=pwd_context.hash(user.password)
    
    user_dict={
        'name':user.name,
        'email':user.email,
        'password':hashed_password,
        'phone':user.phone
    }
    
    result=await users_collection.insert_one(user_dict)
    return {'status':'Registered Successfully','id':str(result.inserted_id)}