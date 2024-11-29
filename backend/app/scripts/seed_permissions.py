import sys
import os

# Add the parent directory to Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.domain.permission_model import Permission
from app.models.domain.user_model import Base
from app.core.database import engine

def seed_permissions():
    # Create a database session
    db = SessionLocal()

    try:
        # Check if permissions already exist
        existing_permissions = db.query(Permission).all()
        if existing_permissions:
            print("Permissions already seeded.")
            return

        # Define initial permissions
        permissions = [
            Permission(name="basic_read", description="Basic read access", scope="basic"),
            Permission(name="individual_read", description="Individual user read access", scope="individual"),
            Permission(name="individual_write", description="Individual user write access", scope="individual"),
            Permission(name="corporate_read", description="Corporate user read access", scope="corporate"),
            Permission(name="corporate_write", description="Corporate user write access", scope="corporate"),
            Permission(name="admin_full", description="Full administrative access", scope="admin")
        ]

        # Add permissions to the session
        db.add_all(permissions)
        
        # Commit the transaction
        db.commit()
        print("Permissions seeded successfully.")

    except Exception as e:
        print(f"Error seeding permissions: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    # Create tables if they don't exist
    Base.metadata.create_all(bind=engine)
    
    # Seed permissions
    seed_permissions()
