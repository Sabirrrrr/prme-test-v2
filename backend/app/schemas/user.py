from pydantic import BaseModel, EmailStr, Field, validator
from typing import List, Optional
from datetime import datetime

from ..models.domain.user_model import UserType, UserStatus
from ..models.domain.permission_model import PermissionScope

class PermissionBase(BaseModel):
    name: str
    description: Optional[str] = None
    scope: PermissionScope

class PermissionOut(PermissionBase):
    id: int

    class Config:
        from_attributes = True

class UserBase(BaseModel):
    email: EmailStr
    user_type: UserType = UserType.INDIVIDUAL
    status: UserStatus = UserStatus.ACTIVE
    is_verified: bool = False

class UserCreate(UserBase):
    password: str = Field(
        ..., 
        min_length=8, 
        description="Password must be at least 8 characters long"
    )

    @validator('password')
    def validate_password(cls, password):
        # Enhanced password validation
        if not any(char.isdigit() for char in password):
            raise ValueError('Password must contain at least one digit')
        if not any(char.isupper() for char in password):
            raise ValueError('Password must contain at least one uppercase letter')
        if not any(char.islower() for char in password):
            raise ValueError('Password must contain at least one lowercase letter')
        if not any(char in '!@#$%^&*()_+-=[]{}|;:,.<>?' for char in password):
            raise ValueError('Password must contain at least one special character')
        return password

class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    user_type: Optional[UserType] = None
    status: Optional[UserStatus] = None
    is_verified: Optional[bool] = None

class UserInDB(UserBase):
    id: int
    created_at: datetime
    permissions: List[PermissionBase] = []

    class Config:
        orm_mode = True

class UserResponse(UserBase):
    id: int
    created_at: datetime
    permissions: List[str] = []  # Only permission names

    class Config:
        orm_mode = True

class UserOut(UserBase):
    id: int
    user_type: UserType
    status: UserStatus
    created_at: datetime
    permissions: List[PermissionOut] = []

    class Config:
        from_attributes = True

class UserLogin(UserBase):
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    id: str | None = None
