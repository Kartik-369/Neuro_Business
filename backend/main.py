from fastapi import FastAPI
from contextlib import asynccontextmanager
from database import db_connec
from routes import user
from fastapi.middleware.cors import CORSMiddleware
from routes import user
from routes import data

@asynccontextmanager
async def life(app:FastAPI):
	await db_connec()
	yield

app=FastAPI(lifespan=life)

origins=[
    "http://localhost:5173/",
    "http://127.0.0.1:8000/"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(user.router)
app.include_router(data.router)


@app.get('/')
def home():
	return {'hello'}