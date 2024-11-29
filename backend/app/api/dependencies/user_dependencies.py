from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Annotated

from ...core.database import get_db
from ...core.security import get_current_user as security_get_current_user
from ...models.domain.user_model import User

async def get_current_user(
    db: Annotated[Session, Depends(get_db)],
    current_user: Annotated[User, Depends(security_get_current_user)]
) -> User:
    """
    Get the current authenticated user.
    Raises 401 if not authenticated or user not found.
    """
    if not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Check if user is active
    if current_user.status != "active":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is not active",
        )
    
    return current_user

async def get_current_active_admin(
    current_user: Annotated[User, Depends(get_current_user)]
) -> User:
    """
    Get the current authenticated admin user.
    Raises 403 if user is not an admin.
    """
    if current_user.user_type != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions",
        )
    return current_user
