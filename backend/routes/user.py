from fastapi import APIRouter, HTTPException
from models import UserCreate
from database import users
from passlib.context import CryptContext

router=APIRouter()

passW_context=CryptContext(schemes=["brcypt"],deprecated="auto")

@router.post("/register")
async def register_user(user: UserCreate):
    existing_user = await users_collection.find_one({"email": user.email})

    if existing_user:
    	
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = pwd_context.hash(user.password)

    user_dict = {
        "name": user.name,
        "email": user.email,
        "password": hashed_password,
        "phone": user.phone
    }
    result = await users_collection.insert_one(user_dict)

    return {"status": "User created", "id": str(result.inserted_id)}