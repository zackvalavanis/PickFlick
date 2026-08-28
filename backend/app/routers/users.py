from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserPublic, UserResponse
from app.utils.auth import get_current_user, hash_password  # add this import at the top

router = APIRouter()

db_dependency = Depends(get_db)
curr_user = Depends(get_current_user)


@router.get("/users", response_model=list[UserPublic])
def get_users(db: Session = db_dependency):
    users = db.query(User).all()
    return users


@router.get("/users/me", response_model=UserResponse)
def get_user_me(current_user: User = curr_user):
    return current_user


@router.get("/users/{id}", response_model=UserResponse)
def get_user(id: str, db: Session = db_dependency):
    user = db.query(User).filter(User.id == id).first()
    return user


@router.post("/users", response_model=UserResponse)
def create_user(user: UserCreate, db: Session = db_dependency):
    new_user = User(
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
        hashed_password=hash_password(user.password),
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


@router.patch("/users/{id}", response_model=UserResponse)
def update_user(id: str, user: UserCreate, db: Session = db_dependency):
    db_user = db.query(User).filter(User.id == id).first()
    db_user.first_name = user.first_name
    db_user.last_name = user.last_name
    db_user.email = user.email
    db.commit()
    db.refresh(db_user)
    return db_user


@router.delete("/users/{id}")
def delete_user(id: str, db: Session = db_dependency):
    db_user = db.query(User).filter(User.id == id).first()
    db.delete(db_user)
    db.commit()
    return {"Message": "The User has been deleted"}
