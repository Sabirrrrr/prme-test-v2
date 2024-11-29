from typing import Optional, Dict
from datetime import datetime, timedelta
from jose import jwt, JWTError

from ..repositories.user_repository import UserRepository
from ..models.domain.user_model import User, UserStatus
from ..core.security import verify_password, create_access_token, create_refresh_token, hash_password
from ..core.config import settings
from .base_service import BaseService
from ..schemas.user import UserLogin, UserCreate
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends
from ..database import get_db

import logging

logger = logging.getLogger(__name__)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def get_current_user(token: str = Depends(oauth2_scheme)) -> Optional[User]:
    """
    Get current user from JWT token
    
    Args:
        token (str): JWT token
    
    Returns:
        Optional[User]: Current authenticated user
    """
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            return None
        
        user_repository = UserRepository(next(get_db()))
        user = user_repository.get_by_email(email)
        return user
    except JWTError:
        return None

class AuthService(BaseService):
    def __init__(self, repository: UserRepository):
        super().__init__(repository)
        self.repository = repository

    def authenticate_user(self, email: str, password: str) -> Optional[User]:
        """
        Authenticate user with email and password
        
        Args:
            email (str): User's email
            password (str): User's password
        
        Returns:
            Optional[User]: Authenticated user or None
        """
        try:
            user = self.repository.get_by_email(email)
            if not user:
                logger.warning(f"Login attempt with non-existent email: {email}")
                return None

            if user.status != UserStatus.ACTIVE:
                logger.warning(f"Login attempt for inactive user: {email}")
                return None

            if not verify_password(password, user.hashed_password):
                logger.warning(f"Failed login attempt for email: {email}")
                return None

            logger.info(f"Successful login for user: {email}")
            return user

        except Exception as e:
            logger.error(f"Authentication error: {str(e)}")
            return None

    def create_tokens(self, user: User) -> Dict[str, str]:
        """
        Create access and refresh tokens for user
        
        Args:
            user (User): Authenticated user
        
        Returns:
            Dict[str, str]: Token details
        """
        try:
            # Include user permissions in token payload
            token_permissions = [perm.scope.value for perm in user.permissions]
            
            access_token = create_access_token(
                data={
                    "sub": user.email, 
                    "permissions": token_permissions,
                    "user_type": user.user_type.value
                }
            )
            refresh_token = create_refresh_token(
                data={
                    "sub": user.email,
                    "token_type": "refresh"
                }
            )
            
            logger.info(f"Tokens created for user: {user.email}")
            return {
                "access_token": access_token,
                "refresh_token": refresh_token,
                "token_type": "bearer"
            }

        except Exception as e:
            logger.error(f"Token creation error: {str(e)}")
            raise

    def refresh_access_token(self, refresh_token: str) -> Optional[Dict[str, str]]:
        """
        Create new access token using refresh token
        
        Args:
            refresh_token (str): Refresh token
        
        Returns:
            Optional[Dict[str, str]]: New access token or None
        """
        try:
            payload = jwt.decode(
                refresh_token, 
                settings.SECRET_KEY, 
                algorithms=[settings.ALGORITHM]
            )
            
            email: str = payload.get("sub")
            token_type: str = payload.get("token_type")
            
            if email is None or token_type != "refresh":
                logger.warning("Invalid refresh token")
                return None
                
            user = self.repository.get_by_email(email)
            if user is None:
                logger.warning(f"No user found for email: {email}")
                return None
            
            # Create new access token with updated permissions
            token_permissions = [perm.scope.value for perm in user.permissions]
            access_token = create_access_token(
                data={
                    "sub": email, 
                    "permissions": token_permissions,
                    "user_type": user.user_type.value
                }
            )
            
            logger.info(f"Access token refreshed for user: {email}")
            return {
                "access_token": access_token,
                "token_type": "bearer"
            }
        
        except JWTError:
            logger.warning("JWT token decoding error during refresh")
            return None
        except Exception as e:
            logger.error(f"Token refresh error: {str(e)}")
            return None

    def get_current_user(self, token: str = Depends(oauth2_scheme)) -> Optional[User]:
        """
        Get current user from JWT token
        
        Args:
            token (str): JWT token
        
        Returns:
            Optional[User]: Current authenticated user
        """
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
            email: str = payload.get("sub")
            if email is None:
                return None
            
            user_repository = UserRepository(next(get_db()))
            user = user_repository.get_by_email(email)
            return user
        except JWTError:
            return None

    def register_user(self, user_data: UserCreate) -> Optional[User]:
        """
        Register a new user
        
        Args:
            user_data (UserCreate): User registration data
        
        Returns:
            Optional[User]: Registered user or None
        """
        try:
            # Use user service to create user
            from .user_service import UserService
            user_service = UserService(self.repository)
            new_user = user_service.create_user(user_data)
            
            # Send verification email (to be implemented)
            # self.send_verification_email(new_user)
            
            logger.info(f"User registered successfully: {new_user.email}")
            return new_user
        
        except Exception as e:
            logger.error(f"User registration error: {str(e)}")
            return None

    def verify_user_email(self, email: str) -> Optional[User]:
        """
        Verify user's email
        
        Args:
            email (str): User's email
        
        Returns:
            Optional[User]: Verified user or None
        """
        try:
            user = self.repository.get_by_email(email)
            if not user:
                logger.warning(f"Verification attempt for non-existent email: {email}")
                return None
            
            user.is_verified = True
            updated_user = self.repository.update(user)
            
            logger.info(f"Email verified for user: {email}")
            return updated_user
        
        except Exception as e:
            logger.error(f"Email verification error: {str(e)}")
            return None
