from pydantic_settings import BaseSettings
from pydantic import BaseModel

class Settings(BaseSettings):
    # Database settings
    DATABASE_HOSTNAME: str = "localhost"
    DATABASE_PORT: str = "5432"
    DATABASE_PASSWORD: str = "sabir123QW!&"
    DATABASE_NAME: str = "fastapi"
    DATABASE_USERNAME: str = "postgres"
    
    # Database URL
    @property
    def SQLALCHEMY_DATABASE_URL(self) -> str:
        return f"postgresql://{self.DATABASE_USERNAME}:{self.DATABASE_PASSWORD}@{self.DATABASE_HOSTNAME}:{self.DATABASE_PORT}/{self.DATABASE_NAME}"
    
    # Security settings
    SECRET_KEY: str = "your-secret-key-here"  # In production, use a secure secret key
    ALGORITHM: str = "HS256"
    
    # Token settings
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    # API settings
    API_V1_STR: str = "/api"
    PROJECT_NAME: str = "FastAPI Social Media API"

    class Config:
        env_file = ".env"
        case_sensitive = True
        extra = "allow"  # Allow extra fields

settings = Settings()
