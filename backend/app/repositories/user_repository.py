from typing import Optional
from sqlalchemy.orm import Session
from ..models.domain.user_model import User
from .base_repository import BaseRepository

class UserRepository(BaseRepository[User]):
    def __init__(self, db: Session):
        super().__init__(db, User)

    def get_by_email(self, email: str) -> Optional[User]:
        return self.db.query(User).filter(User.email == email).first()

    def get_by_id(self, user_id: int) -> Optional[User]:
        return self.db.query(User).filter(User.id == user_id).first()

    def create_with_permissions(self, user: User, permissions: list) -> User:
        """Create user with associated permissions"""
        user.permissions.extend(permissions)
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user

    def update_status(self, user: User, new_status: str) -> User:
        """Update user status"""
        user.status = new_status
        self.db.commit()
        self.db.refresh(user)
        return user
