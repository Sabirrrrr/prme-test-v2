import logging
from sqlalchemy.exc import IntegrityError
from typing import Optional, List

from ..repositories.user_repository import UserRepository
from ..models.domain.user_model import User, UserType, UserStatus
from ..models.domain.permission_model import Permission, PermissionScope
from ..schemas.user import UserCreate, UserUpdate
from ..core.security import hash_password
from .base_service import BaseService

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

class UserService(BaseService):
    def __init__(self, repository: UserRepository):
        super().__init__(repository)
        self.repository = repository

    def create_user(self, user_data: UserCreate) -> User:
        """
        Create a new user with robust validation and permission assignment
        
        Args:
            user_data (UserCreate): User creation data
        
        Returns:
            User: Created user instance
        
        Raises:
            ValueError: If email is already registered or validation fails
        """
        try:
            # Log the incoming user data (be careful with sensitive info in production)
            logger.info(f"Attempting to create user with email: {user_data.email}")
            
            # Check if user exists
            existing_user = self.get_user_by_email(user_data.email)
            if existing_user:
                logger.warning(f"Email already registered: {user_data.email}")
                raise ValueError("Email already registered")

            # Determine default permission based on user type
            default_permission = self._get_default_permission(user_data.user_type)

            # Create user with factory method
            user = User.create_user(
                email=user_data.email,
                hashed_password=hash_password(user_data.password),
                user_type=user_data.user_type,
                default_permission=default_permission
            )

            # Set additional user attributes
            user.status = UserStatus.ACTIVE
            user.is_verified = False  # Require email verification

            # Create user with permissions
            created_user = self.repository.create(user)
            
            logger.info(f"User created successfully: {created_user.email}")
            return created_user

        except IntegrityError as e:
            logger.error(f"Database integrity error during user creation: {str(e)}")
            raise ValueError("An error occurred while creating the user")
        except Exception as e:
            logger.error(f"Unexpected error during user creation: {str(e)}")
            raise

    def update_user(self, user_id: int, user_data: UserUpdate) -> Optional[User]:
        """
        Update user details with partial update support
        
        Args:
            user_id (int): ID of the user to update
            user_data (UserUpdate): User update data
        
        Returns:
            Optional[User]: Updated user or None if not found
        """
        try:
            user = self.get_user_by_id(user_id)
            if not user:
                logger.warning(f"User not found with ID: {user_id}")
                return None

            # Update user attributes if provided
            for field, value in user_data.dict(exclude_unset=True).items():
                setattr(user, field, value)

            updated_user = self.repository.update(user)
            logger.info(f"User updated successfully: {updated_user.email}")
            return updated_user

        except Exception as e:
            logger.error(f"Error updating user: {str(e)}")
            raise

    def _get_default_permission(self, user_type: UserType) -> Optional[Permission]:
        """
        Get default permission based on user type
        
        Args:
            user_type (UserType): Type of user
        
        Returns:
            Optional[Permission]: Default permission for the user type
        """
        try:
            permission_map = {
                UserType.INDIVIDUAL: PermissionScope.USER_READ,
                UserType.CORPORATE: PermissionScope.POST_CREATE,
                UserType.ADMIN: PermissionScope.ADMIN_FULL_ACCESS
            }
            
            scope = permission_map.get(user_type, PermissionScope.USER_READ)
            
            # Find the first permission matching the scope
            default_permission = self.repository.db.query(Permission).filter(
                Permission.scope == scope
            ).first()
            
            return default_permission

        except Exception as e:
            logger.error(f"Error getting default permission: {str(e)}")
            return None

    def get_user_by_email(self, email: str) -> Optional[User]:
        """Get user by email"""
        return self.repository.get_by_email(email)

    def get_user_by_id(self, user_id: int) -> Optional[User]:
        """Get user by ID"""
        return self.repository.get_by_id(user_id)

    def update_user_status(self, user_id: int, new_status: UserStatus) -> Optional[User]:
        """
        Update user status with type-safe status
        
        Args:
            user_id (int): ID of the user to update
            new_status (UserStatus): New status for the user
        
        Returns:
            Optional[User]: Updated user or None if not found
        """
        user = self.get_user_by_id(user_id)
        if user:
            user.status = new_status
            return self.repository.update(user)
        return None

    def assign_permission(self, user_id: int, permission: Permission) -> Optional[User]:
        """
        Assign a permission to a user
        
        Args:
            user_id (int): ID of the user
            permission (Permission): Permission to assign
        
        Returns:
            Optional[User]: Updated user or None if not found
        """
        user = self.get_user_by_id(user_id)
        if user:
            user.assign_permission(permission)
            return self.repository.update(user)
        return None

    def revoke_permission(self, user_id: int, permission: Permission) -> Optional[User]:
        """
        Revoke a permission from a user
        
        Args:
            user_id (int): ID of the user
            permission (Permission): Permission to revoke
        
        Returns:
            Optional[User]: Updated user or None if not found
        """
        user = self.get_user_by_id(user_id)
        if user:
            user.revoke_permission(permission)
            return self.repository.update(user)
        return None
