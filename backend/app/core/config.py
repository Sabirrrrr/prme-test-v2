from pydantic_settings import BaseSettings
from pydantic import BaseModel

class Settings(BaseSettings):
    DATABASE_HOSTNAME: str = "localhost"
    DATABASE_PORT: str = "5432"
    DATABASE_PASSWORD: str = "sabir123QW!&"
    DATABASE_NAME: str = "fastapi"
    DATABASE_USERNAME: str = "postgres"
    SECRET_KEY: str = "your-secret-key-here"  # In production, use a secure secret key
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    class Config:
        env_file = ".env"
        case_sensitive = True
        extra = "allow"  # Allow extra fields

settings = Settings()
