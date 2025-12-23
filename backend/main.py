from fastapi import FastAPI
from contextlib import asynccontextmanager
# from database import check_db_connection
from routes import user  # <--- NEW LINE 1

@asynccontextmanager
async def lifespan(app: FastAPI):
    await check_db_connection()
    yield

app = FastAPI(lifespan=lifespan)

# This connects the user routes to the main app
app.include_router(user.router) # <--- NEW LINE 2

@app.get("/")
async def root():
    return {"message": "NeuroBusiness Backend is Running"}