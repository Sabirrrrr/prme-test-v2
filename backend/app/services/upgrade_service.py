from typing import Optional
from sqlalchemy.orm import Session

from ..models.domain.user_model import User, UserType
from ..models.domain.user_upgrade import UserUpgrade, UpgradeStatus
from ..repositories.user_repository import UserRepository

class UpgradeService:
    def __init__(self, db: Session, user_repository: UserRepository):
        self.db = db
        self.user_repository = user_repository

    def upgrade_user_to_corporate(self, user_id: int) -> Optional[User]:
        """
        Upgrade a user from individual to corporate type
        """
        try:
            user = self.user_repository.get_by_id(user_id)
            
            if not user:
                return None
            
            # Create upgrade record
            upgrade_record = UserUpgrade(
                user_id=user_id,
                old_type=user.user_type.value,
                new_type=UserType.CORPORATE.value,
                status=UpgradeStatus.COMPLETED
            )
            
            # Update user type
            user.user_type = UserType.CORPORATE
            
            # Save changes
            self.db.add(upgrade_record)
            self.db.commit()
            
            return user
        
        except Exception as e:
            self.db.rollback()
            print(f"Upgrade error: {e}")
            return None
