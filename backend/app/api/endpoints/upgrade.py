from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ...database import get_db
from ...services.auth_service import get_current_user
from ...models.domain.user_model import User
from ...services.upgrade_service import UpgradeService
from ...repositories.user_repository import UserRepository

router = APIRouter()

@router.post("/upgrade-to-corporate")
async def upgrade_to_corporate(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Upgrade current user to corporate type
    """
    user_repository = UserRepository(db)
    upgrade_service = UpgradeService(db, user_repository)
    
    upgraded_user = upgrade_service.upgrade_user_to_corporate(current_user.id)
    
    if not upgraded_user:
        raise HTTPException(status_code=400, detail="Upgrade failed")
    
    return {"message": "Successfully upgraded to corporate", "user_type": upgraded_user.user_type.value}
