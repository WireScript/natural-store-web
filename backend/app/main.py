from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.v1 import auth
from .db.mongodb import mongodb
from .db.redis import redis_client

# Initialize FastAPI app
app = FastAPI(
    title="Natural Store API",
    description="Natural Store API is a platform for selling nature-based products",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])

@app.on_event("startup")
async def startup_event():
    await mongodb.connect()
    await redis_client.connect()

@app.on_event("shutdown")
async def shutdown_event():
    await mongodb.close()
    await redis_client.close()

# Root Endpoint
@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Welcome to Natural Store API"}


@app.get("/users")
async def get_users():
    users = await mongodb.db.users.find().to_list(length=100)
    return users