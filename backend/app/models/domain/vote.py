from sqlalchemy import Integer, ForeignKey
from sqlalchemy.orm import relationship, Mapped, mapped_column
from typing import TYPE_CHECKING

from ...database import Base

if TYPE_CHECKING:
    from .user_model import User
    from .post import Post

class Vote(Base):
    __tablename__ = "votes"
    
    user_id: Mapped[int] = mapped_column(
        Integer, 
        ForeignKey("users.id", ondelete="CASCADE"), 
        primary_key=True
    )
    post_id: Mapped[int] = mapped_column(
        Integer, 
        ForeignKey("posts.id", ondelete="CASCADE"), 
        primary_key=True
    )
    
    # Relationships with type hints
    user: Mapped['User'] = relationship(
        "User", 
        back_populates="votes"
    )
    post: Mapped['Post'] = relationship(
        "Post"
    )
