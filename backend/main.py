from fastapi import FastAPI
from contextlib import asynccontextmanager
from database import db_connec
@asynccontextmanager
async def life(app:FastAPI):
	await db_connec()
	yield

app=FastAPI(lifespan=life)

@app.get('/')
def home():
	return {'hello'}