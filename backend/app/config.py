from pydantic import ConfigDict
from pydantic_settings import BaseSettings

CORS_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:5174",
]


class Settings(BaseSettings):
    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int
    TMDB_ACCESS_TOKEN: str
    ANTHROPIC_API_KEY: str

    model_config = ConfigDict(env_file=".env")


settings = Settings()
