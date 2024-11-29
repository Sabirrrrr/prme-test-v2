from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from ...core.database import get_db
from ...schemas.token_schema import Token
from ...services.auth_service import AuthService
from ...repositories.user_repository import UserRepository

router = APIRouter()

def get_auth_service(db: Session = Depends(get_db)) -> AuthService:
    repository = UserRepository(db)
    return AuthService(repository)

@router.post("/login", response_model=Token)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    service: AuthService = Depends(get_auth_service)
):
    """
    Login endpoint that accepts form-urlencoded data:
    - username: User's email
    - password: User's password
    """
    user = service.authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if user.status != "active":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is not active",
        )

    return service.create_tokens(user)

@router.post("/refresh", response_model=Token)
async def refresh_token(
    refresh_token: str,
    service: AuthService = Depends(get_auth_service)
):
    """
    Refresh token endpoint to get a new access token using a refresh token
    """
    tokens = service.refresh_access_token(refresh_token)
    if not tokens:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return tokens
