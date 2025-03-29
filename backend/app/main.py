from fastapi import FastAPI
# from app.api.v1.endpoints import user, auth, item

# Initialize FastAPI app
app = FastAPI(
    title="Nature Essentials",
    description="Nature Essentials is a platform for selling nature-based products",
    version="1.0.0"
)

# Include Routers
# app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
# app.include_router(user.router, prefix="/users", tags=["Users"])
# app.include_router(item.router, prefix="/items", tags=["Items"])

# Root Endpoint
@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Welcome to Nature Essentials!"}
