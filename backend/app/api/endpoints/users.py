from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import traceback
import logging

from ...core.database import get_db
from ...schemas.user_schema import UserCreate, UserResponse
from ...services.user_service import UserService
from ...repositories.user_repository import UserRepository
from ..dependencies.user_dependencies import get_current_user

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

router = APIRouter()

def get_user_service(db: Session = Depends(get_db)) -> UserService:
    repository = UserRepository(db)
    return UserService(repository)

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register_user(
    user: UserCreate,
    service: UserService = Depends(get_user_service)
):
    """
    Register a new user with:
    - email
    - password
    - user_type (optional, defaults to 'individual')
    """
    try:
        logger.debug(f"Received registration request: {user}")
        
        # Add validation for password length
        if len(user.password) < 3:
            raise ValueError("Password must be at least 3 characters long")
        
        return service.create_user(user)
    except ValueError as e:
        logger.error(f"Validation Error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        logger.error(f"Unexpected Error during registration: {str(e)}")
        logger.error(traceback.format_exc())
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An unexpected error occurred: {str(e)}"
        )

@router.get("/me", response_model=UserResponse)
async def get_current_user_info(
    current_user = Depends(get_current_user)
):
    """
    Get current user's profile using their JWT token
    """
    return current_user

@router.get("/{user_id}", response_model=UserResponse)
async def get_user(
    user_id: int,
    service: UserService = Depends(get_user_service),
    current_user = Depends(get_current_user)
):
    """
    Get user by ID (requires authentication)
    """
    user = service.get_user_by_id(user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return user

@router.patch("/{user_id}/status")
async def update_user_status(
    user_id: int,
    new_status: str,
    service: UserService = Depends(get_user_service),
    current_user = Depends(get_current_user)
):
    """
    Update user status (requires admin privileges)
    """
    if current_user.user_type != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    
    user = service.update_user_status(user_id, new_status)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return user
