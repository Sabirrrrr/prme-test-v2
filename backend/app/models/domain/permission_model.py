from sqlalchemy import Column, Integer, String, ForeignKey, Table
from sqlalchemy.orm import relationship, Mapped, mapped_column
from enum import Enum
from typing import List, Optional

from ...database import Base

# User-Permission many-to-many relationship table
user_permissions = Table(
    'user_permissions',
    Base.metadata,
    Column('user_id', Integer, ForeignKey('users.id', ondelete="CASCADE")),
    Column('permission_id', Integer, ForeignKey('permissions.id', ondelete="CASCADE")),
    extend_existing=True
)

class PermissionScope(str, Enum):
    # More granular and descriptive permission scopes
    USER_READ = "user:read"
    USER_WRITE = "user:write"
    USER_DELETE = "user:delete"
    
    POST_READ = "post:read"
    POST_CREATE = "post:create"
    POST_UPDATE = "post:update"
    POST_DELETE = "post:delete"
    
    ADMIN_FULL_ACCESS = "admin:full"
    MODERATOR_ACCESS = "moderator:manage"

class Permission(Base):
    __tablename__ = "permissions"
    __table_args__ = {'extend_existing': True}

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String, unique=True, index=True, nullable=False)
    description: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    scope: Mapped[PermissionScope] = mapped_column(String, nullable=False)
    
    # Relationships with type hints
    users: Mapped[List['User']] = relationship(
        "User", 
        secondary=user_permissions, 
        back_populates="permissions"
    )

    @classmethod
    def create_default_permissions(cls) -> List['Permission']:
        """
        Create a set of default permissions for the system.
        This method can be used during initial database setup.
        """
        default_permissions = [
            cls(name="Basic User", description="Standard user permissions", scope=PermissionScope.USER_READ),
            cls(name="Content Creator", description="Can create and edit posts", scope=PermissionScope.POST_CREATE),
            cls(name="Moderator", description="Can manage content", scope=PermissionScope.MODERATOR_ACCESS),
            cls(name="Admin", description="Full system access", scope=PermissionScope.ADMIN_FULL_ACCESS)
        ]
        return default_permissions

    def __repr__(self) -> str:
        return f"&lt;Permission {self.name}: {self.scope.value}&gt;"
