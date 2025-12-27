from fastapi import FastAPI
from contextlib import asynccontextmanager
from database import db_connec
from routes import user
@asynccontextmanager
async def life(app:FastAPI):
	await db_connec()
	yield

app=FastAPI(lifespan=life)

app.include_router(user.router)

@app.get('/')
def home():
	return {'hello'}