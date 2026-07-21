from typing import List
from app.schemas.user import UserResponse, UserCreate
from app.database import get_db
from app.models.user import User
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session


router = APIRouter()


@router.get("/users", response_model=List[UserResponse])
def get_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return users


@router.get("/users/{id}", response_model=UserResponse)
def get_user(id: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == id).first()
    return user


@router.post("/users", response_model=UserResponse)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    new_user = User(
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
        hashed_password=user.password,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


@router.patch("/users/{id}", response_model=UserResponse)
def update_user(id: str, user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == id).first()
    db_user.first_name = user.first_name
    db_user.last_name = user.last_name
    db_user.email = user.email
    db.commit()
    db.refresh(db_user)
    return db_user


@router.delete("/users/{id}")
def delete_user(id: str, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == id).first()
    db.delete(db_user)
    db.commit()
    return {"Message": "The User has been deleted"}
