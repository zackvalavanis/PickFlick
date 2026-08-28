import uuid
from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, EmailStr


class UserBase(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr


class UserPublic(UserBase):
    id: uuid.UUID
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class UserCreate(UserBase):
    password: str


class UserUpdate(UserBase):
    first_name: str | None = None
    last_name: str | None = None
    email: str | None = None

    model_config = ConfigDict(from_attributes=True)


class MoviePublic(BaseModel):
    id: uuid
    tmdb_id: int
    title: str
    poster_path: str | None = None

    model_config = ConfigDict(from_attributes=True)


class UserResponse(UserBase):
    id: UUID
    first_name: str
    last_name: str
    created_at: datetime
    updated_at: datetime
    model_config = ConfigDict(from_attributes=True)
    movies: list[MoviePublic] = []


class LoginRequest(BaseModel):
    email: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    first_name: str
    last_name: str
