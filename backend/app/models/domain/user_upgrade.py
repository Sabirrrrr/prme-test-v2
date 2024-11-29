from sqlalchemy import Column, Integer, String, DateTime, Enum as SQLEnum
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql import func
from datetime import datetime
from enum import Enum

from ...database import Base

class UpgradeStatus(str, Enum):
    PENDING = "pending"
    COMPLETED = "completed"
    FAILED = "failed"

class UserUpgrade(Base):
    __tablename__ = "user_upgrades"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(Integer, nullable=False)
    old_type: Mapped[str] = mapped_column(String, nullable=False)
    new_type: Mapped[str] = mapped_column(String, nullable=False)
    status: Mapped[UpgradeStatus] = mapped_column(SQLEnum(UpgradeStatus), default=UpgradeStatus.PENDING)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    
    def __repr__(self):
        return f"&lt;UserUpgrade {self.id}: {self.user_id} from {self.old_type} to {self.new_type}&gt;"
