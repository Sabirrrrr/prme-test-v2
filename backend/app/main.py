from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.endpoints import auth, posts, votes, users, upgrade
from app.core.config import settings
from app.database import Base, engine

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS middleware configuration
origins = [
    "http://localhost:5173",    # Vite dev server
    "http://127.0.0.1:5173",
    "http://localhost:3000",    # Alternative dev port
    "http://127.0.0.1:3000",
    "http://localhost:8080",    # Production build
    "http://127.0.0.1:8080",
    "http://localhost:8000",    # Backend server
    "http://127.0.0.1:8000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

# Include routers with API prefix
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(users.router, prefix="/api/users", tags=["Users"])
app.include_router(posts.router, prefix="/api/posts", tags=["Posts"])
app.include_router(votes.router, prefix="/api/votes", tags=["Votes"])
app.include_router(upgrade.router, prefix="/api/upgrade", tags=["upgrade"])

@app.get("/")
def root():
    return {"message": "Welcome to FastAPI Social Media API!"}

# Add a debug route to test CORS
@app.options("/api/users/register")
async def options_register():
    return {"status": "ok"}
