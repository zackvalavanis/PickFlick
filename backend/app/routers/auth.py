from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session


from app.database import get_db
from app.models.user import User
from app.schemas.user import LoginRequest, TokenResponse
from app.utils.auth import create_access_token, verify_password

router = APIRouter()
db_dependency = Depends(get_db)


@router.post("/auth/login", response_model=TokenResponse)
def login(auth: LoginRequest, db: Session = db_dependency):
    user = db.query(User).filter(User.email == auth.email).first()

    if not user:
        raise HTTPException(status_code=401, detail="invalid credentials")

    if not verify_password(auth.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="invalid credentials")

    token = create_access_token({"sub": user.email})
    first_name = user.first_name
    last_name = user.last_name

    return {
        "access_token": token,
        "token_type": "bearer",
        "first_name": first_name,
        "last_name": last_name,
    }
