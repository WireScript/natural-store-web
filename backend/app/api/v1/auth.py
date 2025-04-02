from datetime import timedelta, datetime
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from app.core.config import settings
from app.core.security import verify_password, get_password_hash, create_access_token, get_current_user
from app.models.user import UserCreate, User
from app.db.mongodb import mongodb
from app.services.otp import otp_service

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@router.post("/signup", response_model=User)
async def signup(user: UserCreate):
    # Check if user already exists
    existing_user = await mongodb.db.users.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Check if username is taken
    existing_username = await mongodb.db.users.find_one({"username": user.username})
    if existing_username:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already taken"
        )
    
    # Create new user
    user_dict = user.model_dump()
    user_dict["hashed_password"] = get_password_hash(user_dict.pop("password"))
    user_dict["is_active"] = True
    user_dict["is_verified"] = False
    user_dict["created_at"] = user_dict["updated_at"] = datetime.utcnow()
    
    # Normalize phone number format (remove spaces, dashes, etc.)
    if user_dict.get("phone_number"):
        user_dict["phone_number"] = ''.join(filter(str.isdigit, user_dict["phone_number"]))
    
    print(f"Creating new user with phone_number: {user_dict.get('phone_number')}")
    
    result = await mongodb.db.users.insert_one(user_dict)
    user_dict["_id"] = str(result.inserted_id)
    
    return User(**user_dict)

@router.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    # Check if user exists by email or username
    user = await mongodb.db.users.find_one({
        "$or": [
            {"email": form_data.username},
            {"username": form_data.username}
        ]
    })
    
    print(f"Login attempt for username: {form_data.username}")
    
    if not user:
        print(f"No user found with username/email: {form_data.username}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email/username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not verify_password(form_data.password, user["hashed_password"]):
        print(f"Password verification failed for user: {user['_id']}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email/username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Check if the user is verified
    is_verified = user.get("is_verified", False)
    print(f"User verification status: {is_verified}")
    
    if not is_verified:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Account not verified. Please verify your account first.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(user["_id"])},
        expires_delta=access_token_expires
    )
    
    print(f"Successfully created token for user: {user['_id']}")
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/send-otp")
async def send_otp(request: dict):
    phone_number = request.get("phone_number")
    if not phone_number:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Phone number is required"
        )
    
    # Normalize phone number format (remove spaces, dashes, etc.)
    phone_number = ''.join(filter(str.isdigit, phone_number))
    
    print(f"Generating OTP for phone_number: {phone_number}")
    otp = otp_service.generate_otp()
    await otp_service.store_otp(phone_number, otp)
    
    success = await otp_service.send_otp(phone_number, otp)
    if not success:
        print(f"Failed to send OTP to phone_number: {phone_number}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to send OTP"
        )
    
    print(f"Successfully sent OTP to phone_number: {phone_number}")
    return {"message": "OTP sent successfully"}

@router.post("/verify-otp")
async def verify_otp(request: dict):
    phone_number = request.get("phone_number")
    otp = request.get("otp")
    
    if not phone_number or not otp:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Phone number and OTP are required"
        )
    
    # Normalize phone number format (remove spaces, dashes, etc.)
    phone_number = ''.join(filter(str.isdigit, phone_number))
    
    print(f"Verifying OTP for phone_number: {phone_number}, OTP: {otp}")
    
    is_valid = await otp_service.verify_otp(phone_number, otp)
    if not is_valid:
        print(f"OTP validation failed for phone_number: {phone_number}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired OTP"
        )
    
    # Find the user by phone number first
    print(f"Looking for user with phone_number: {phone_number}")
    user = await mongodb.db.users.find_one({"phone_number": phone_number})
    if not user:
        print(f"No user found with phone_number: {phone_number}")
        # Try to debug by finding any users with similar phone numbers
        all_users = await mongodb.db.users.find().to_list(length=10)
        for u in all_users:
            print(f"User: {u.get('_id')} - phone: {u.get('phone_number')}")
        
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found with the provided phone number"
        )
    
    print(f"Found user: {user['_id']} with phone_number: {user['phone_number']}")
    
    # Update user verification status
    result = await mongodb.db.users.update_one(
        {"_id": user["_id"]},
        {"$set": {"is_verified": True}}
    )
    
    if result.modified_count == 0:
        print(f"Failed to update verification status for user: {user['_id']}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update user verification status"
        )
    
    print(f"Successfully verified user: {user['_id']}")
    return {"message": "OTP verified successfully"}

@router.get("/me", response_model=User)
async def get_current_user_info(current_user: User = Depends(get_current_user)):
    return current_user 