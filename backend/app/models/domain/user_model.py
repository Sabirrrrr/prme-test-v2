from sqlalchemy import Column, Integer, String, Enum as SQLEnum, DateTime, Boolean
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy.sql import func
from typing import List, Optional, TYPE_CHECKING
from enum import Enum
from datetime import datetime

from ...database import Base
from .permission_model import Permission, PermissionScope, user_permissions

# Use conditional import to avoid circular dependencies
if TYPE_CHECKING:
    from .post import Post
    from .vote import Vote

class UserType(str, Enum):
    INDIVIDUAL = "individual"
    CORPORATE = "corporate"
    ADMIN = "admin"

class UserStatus(str, Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"
    SUSPENDED = "suspended"

class User(Base):
    __tablename__ = "users"
    __table_args__ = {'extend_existing': True}

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    email: Mapped[str] = mapped_column(String, unique=True, index=True, nullable=False)
    hashed_password: Mapped[str] = mapped_column(String, nullable=False)
    user_type: Mapped[UserType] = mapped_column(SQLEnum(UserType), nullable=False, default=UserType.INDIVIDUAL)
    status: Mapped[UserStatus] = mapped_column(SQLEnum(UserStatus), nullable=False, default=UserStatus.ACTIVE)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    is_verified: Mapped[bool] = mapped_column(Boolean, default=False, server_default='false')
    
    # Relationships with type hints
    permissions: Mapped[List[Permission]] = relationship(
        "Permission", 
        secondary=user_permissions, 
        back_populates="users"
    )
    posts: Mapped[List['Post']] = relationship(
        "Post", 
        back_populates="owner", 
        cascade="all, delete-orphan"
    )
    votes: Mapped[List['Vote']] = relationship(
        "Vote", 
        back_populates="user", 
        cascade="all, delete-orphan"
    )

    def has_permission(self, required_scope: PermissionScope) -> bool:
        """
        Check if the user has a specific permission scope.
        
        Args:
            required_scope (PermissionScope): The permission scope to check.
        
        Returns:
            bool: True if the user has the required permission, False otherwise.
        """
        return any(permission.scope.value == required_scope.value for permission in self.permissions)

    def assign_permission(self, permission: Permission) -> None:
        """
        Assign a permission to the user.
        
        Args:
            permission (Permission): The permission to assign.
        """
        if permission not in self.permissions:
            self.permissions.append(permission)

    def revoke_permission(self, permission: Permission) -> None:
        """
        Revoke a specific permission from the user.
        
        Args:
            permission (Permission): The permission to revoke.
        """
        if permission in self.permissions:
            self.permissions.remove(permission)

    @classmethod
    def create_user(
        cls, 
        email: str, 
        hashed_password: str, 
        user_type: UserType = UserType.INDIVIDUAL,
        default_permission: Optional[Permission] = None
    ) -> 'User':
        """
        Factory method to create a new user with optional default permission.
        
        Args:
            email (str): User's email address.
            hashed_password (str): Hashed password.
            user_type (UserType, optional): Type of user. Defaults to INDIVIDUAL.
            default_permission (Optional[Permission], optional): Default permission to assign. Defaults to None.
        
        Returns:
            User: A new user instance.
        """
        user = cls(
            email=email, 
            hashed_password=hashed_password, 
            user_type=user_type
        )
        
        if default_permission:
            user.assign_permission(default_permission)
        
        return user

    def __repr__(self) -> str:
        return f"&lt;User {self.email}: {self.user_type.value}&gt;"
