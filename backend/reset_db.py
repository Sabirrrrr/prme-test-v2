from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import settings
from app.database import Base, engine
from app.models.domain.user_model import User
from app.models.domain.post import Post
from app.models.domain.vote import Vote
from app.models.domain.permission_model import Permission, user_permissions

def reset_database():
    try:
        # Drop all existing tables
        Base.metadata.drop_all(bind=engine)
        
        # Create all tables
        Base.metadata.create_all(bind=engine)
        
        print("Database reset successfully!")
    except Exception as e:
        print(f"Error resetting database: {e}")

if __name__ == "__main__":
    reset_database()
