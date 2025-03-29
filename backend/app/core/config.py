from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # MongoDB settings
    MONGODB_URL: str
    MONGODB_DB_NAME: str

    # Redis settings
    REDIS_URL: str
    REDIS_DB: int

    # JWT settings
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    # OTP settings
    OTP_EXPIRE_MINUTES: int

    # Twilio settings (for SMS OTP)
    TWILIO_ACCOUNT_SID: Optional[str] = None
    TWILIO_AUTH_TOKEN: Optional[str] = None
    TWILIO_PHONE_NUMBER: Optional[str] = None

    class Config:
        env_file = ".env"  # Load environment variables from .env

# Load settings
settings = Settings()
