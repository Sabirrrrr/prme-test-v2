from sqlalchemy.orm import declarative_base

Base = declarative_base()

from .post import Post
from .user_model import User
from .vote import Vote

__all__ = ["Base", "Post", "User", "Vote"]
