from motor.motor_asyncio import AsyncIOMotorClient
import asyncio
from ..core.config import settings

class MongoDB:
    client: AsyncIOMotorClient = None
    db = None

    async def connect(self):
        for retry in range(5):  # Retry 5 times
            try:
                self.client = AsyncIOMotorClient(
                    settings.MONGODB_URL,
                    serverSelectionTimeoutMS=5000  # 5 seconds timeout
                )
                
                # Force a connection to verify it works
                await self.client.admin.command('ping')
                
                self.db = self.client[settings.MONGODB_DB_NAME]
                print(f"Successfully connected to MongoDB at {settings.MONGODB_URL}")
                return
            except Exception as e:
                print(f"MongoDB connection attempt {retry+1} failed: {e}")
                if retry == 4:  # Last retry
                    print("All MongoDB connection attempts failed")
                    raise
                await asyncio.sleep(2)  # Wait 2 seconds before retrying

    async def close(self):
        if self.client:
            self.client.close()
            print("MongoDB connection closed")

mongodb = MongoDB() 