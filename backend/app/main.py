import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware

from app.config import CORS_ORIGINS, settings
from app.database import Base, engine
from app.routers.auth import router as auth_router
from app.routers.search_movies import router as search_movies_router
from app.routers.users import router as users_router

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(SessionMiddleware, secret_key=settings.SECRET_KEY)

app.include_router(users_router)
app.include_router(auth_router)
app.include_router(search_movies_router)


@app.get("/health")
def health():
    return {"status": "ok", "port": os.environ.get("PORT", "NOT SET")}
