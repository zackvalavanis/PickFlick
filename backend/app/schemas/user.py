import uuid
from pydantic import BaseModel, EmailStr, ConfigDict
from datetime import datetime


class UserBase(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr


class UserResponse(UserBase):
    id: uuid.UUID
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class UserCreate(UserBase):
    password: str
