from pydantic import BaseModel

class Token(BaseModel):
    access_token: str
    token_type: str
    refresh_token: str = None

class TokenData(BaseModel):
    email: str | None = None
