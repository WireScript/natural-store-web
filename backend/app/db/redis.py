import redis.asyncio as redis
from ..core.config import settings

class Redis:
    client: redis.Redis = None

    async def connect(self):
        self.client = redis.from_url(
            settings.REDIS_URL,
            db=settings.REDIS_DB,
            decode_responses=True
        )

    async def close(self):
        if self.client:
            await self.client.close()

redis_client = Redis() 