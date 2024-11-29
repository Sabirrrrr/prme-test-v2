from functools import wraps
from fastapi import HTTPException, status
from typing import List, Optional

from ..models.domain.user_model import UserType, UserStatus

def check_permissions(
    required_permissions: Optional[List[str]] = None,
    allowed_user_types: Optional[List[UserType]] = None
):
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            # Current user'ı kwargs'dan al
            current_user = kwargs.get('current_user')
            if not current_user:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Authentication required"
                )

            # User status kontrolü
            if current_user.status != UserStatus.ACTIVE:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail=f"User account is {current_user.status}"
                )

            # Admin her şeye erişebilir
            if current_user.user_type == UserType.ADMIN:
                return await func(*args, **kwargs)

            # User type kontrolü
            if allowed_user_types and current_user.user_type not in allowed_user_types:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="User type not authorized for this operation"
                )

            # Permission kontrolü
            if required_permissions:
                user_permissions = {p.name for p in current_user.permissions}
                if not all(perm in user_permissions for perm in required_permissions):
                    raise HTTPException(
                        status_code=status.HTTP_403_FORBIDDEN,
                        detail="User doesn't have required permissions"
                    )

            return await func(*args, **kwargs)
        return wrapper
    return decorator
