from fastapi import APIRouter, UploadFile, File,Depends
from routes.user import oauth2_scheme

router = APIRouter()

@router.post('/upload')
async def upload_file(file:UploadFile=File(...),token:str=Depends(oauth2_scheme)):
    return {"filename": file.filename, "token": token}