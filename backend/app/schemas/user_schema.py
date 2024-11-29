from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

class PermissionBase(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    scope: str

class UserBase(BaseModel):
    email: EmailStr
    user_type: str = "individual"

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    status: str
    created_at: datetime
    permissions: List[PermissionBase] = []

    class Config:
        from_attributes = True
