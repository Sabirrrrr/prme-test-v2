from sqlalchemy import Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.sql.expression import text
from typing import TYPE_CHECKING

from ...database import Base

if TYPE_CHECKING:
    from .user_model import User

class Post(Base):
    __tablename__ = "posts"
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True, nullable=False)
    title: Mapped[str] = mapped_column(String, nullable=False)
    content: Mapped[str] = mapped_column(String, nullable=False)   
    published: Mapped[bool] = mapped_column(Boolean, server_default='TRUE', nullable=False)   
    created_at: Mapped[TIMESTAMP] = mapped_column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))
    owner_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)

    owner: Mapped['User'] = relationship(
        "User", 
        back_populates="posts"
    )
