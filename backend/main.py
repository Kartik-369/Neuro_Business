import os
from fastapi import FastAPI
from contextlib import asynccontextmanager
from database import db_connec
from routes import user
from fastapi.middleware.cors import CORSMiddleware
from routes import data
from routes import predict

@asynccontextmanager
async def life(app:FastAPI):
	await db_connec()
	yield

app=FastAPI(lifespan=life)

# Build CORS origins from environment variable
# FRONTEND_URL can be a comma-separated list for multiple origins
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")
origins = [url.strip() for url in FRONTEND_URL.split(",")]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(user.router)
app.include_router(data.router)
app.include_router(predict.router)

@app.get('/')
def home():
	return {'hello'}