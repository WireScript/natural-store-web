import random
from datetime import datetime, timedelta
from typing import Optional
from twilio.rest import Client
from ..core.config import settings
from ..db.redis import redis_client

class OTPService:
    @staticmethod
    def generate_otp() -> str:
        # During development, use a fixed OTP for easy testing
        if settings.ENVIRONMENT == "development":
            return "123456"
        return str(random.randint(100000, 999999))

    @staticmethod
    async def send_otp(phone_number: str, otp: str) -> bool:
        # For development, log the OTP and return success
        if settings.ENVIRONMENT == "development":
            print(f"[DEV MODE] OTP for {phone_number}: {otp}")
            return True
            
        if not all([settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN, settings.TWILIO_PHONE_NUMBER]):
            return False

        try:
            client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
            message = client.messages.create(
                body=f"Your verification code is: {otp}",
                from_=settings.TWILIO_PHONE_NUMBER,
                to=phone_number
            )
            return True
        except Exception as e:
            print(f"Error sending OTP via Twilio: {e}")
            return False

    @staticmethod
    async def store_otp(phone_number: str, otp: str) -> None:
        key = f"otp:{phone_number}"
        await redis_client.client.setex(
            key,
            settings.OTP_EXPIRE_MINUTES * 60,
            otp
        )

    @staticmethod
    async def verify_otp(phone_number: str, otp: str) -> bool:
        key = f"otp:{phone_number}"
        stored_otp = await redis_client.client.get(key)
        if stored_otp and stored_otp == otp:
            await redis_client.client.delete(key)
            return True
        return False

otp_service = OTPService() 