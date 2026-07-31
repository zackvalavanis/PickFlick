import os

from authlib.integrations.starlette_client import OAuth
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette.config import Config
from starlette.requests import Request
from starlette.responses import RedirectResponse

from app.config import settings
from app.database import get_db
from app.models.User import User
from app.models.user import User
from app.schemas import LoginRequest, TokenResponse, UserCreate
from app.utils.auth import create_access_token, hash_password, verify_password
