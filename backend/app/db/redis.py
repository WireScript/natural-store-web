import redis.asyncio as redis
import asyncio
from ..core.config import settings

class Redis:
    client: redis.Redis = None

    async def connect(self):
        for retry in range(5):  # Retry 5 times
            try:
                self.client = redis.from_url(
                    settings.REDIS_URL,
                    db=settings.REDIS_DB,
                    decode_responses=True,
                    socket_timeout=5.0,  # 5 seconds timeout
                    socket_connect_timeout=5.0
                )
                
                # Test the connection
                await self.client.ping()
                
                print(f"Successfully connected to Redis at {settings.REDIS_URL}")
                return
            except Exception as e:
                print(f"Redis connection attempt {retry+1} failed: {e}")
                if retry == 4:  # Last retry
                    print("All Redis connection attempts failed")
                    raise
                await asyncio.sleep(2)  # Wait 2 seconds before retrying

    async def close(self):
        if self.client:
            await self.client.close()
            print("Redis connection closed")

redis_client = Redis() 