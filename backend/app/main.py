from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
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
    try:
        cursor = mongodb.db.users.find({})
        users = await cursor.to_list(length=100)
        
        # Convert ObjectIds to strings and remove sensitive data
        for user in users:
            user["_id"] = str(user["_id"])
            if "hashed_password" in user:
                del user["hashed_password"]
        
        return users
    except Exception as e:
        print(f"Error fetching users: {e}")
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@app.get("/health", tags=["Health"])
async def health_check():
    health = {
        "status": "ok",
        "mongodb": False,
        "redis": False
    }
    
    try:
        # Check MongoDB connection
        await mongodb.db.command("ping")
        health["mongodb"] = True
    except Exception as e:
        health["status"] = "degraded"
        health["mongodb_error"] = str(e)
    
    try:
        # Check Redis connection
        await redis_client.client.ping()
        health["redis"] = True
    except Exception as e:
        health["status"] = "degraded"
        health["redis_error"] = str(e)
    
    if not health["mongodb"] or not health["redis"]:
        return JSONResponse(content=health, status_code=503)
    
    return health