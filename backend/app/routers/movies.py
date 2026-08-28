from sqlite3 import IntegrityError

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.movie import Movie
from app.models.user import User
from app.schemas.user import MovieCreate, MoviePublic
from app.utils.auth import get_current_user

router = APIRouter()

database_movies = Depends(get_db)
curr_user = Depends(get_current_user)


@router.get("/my-movies", response_model=list[MoviePublic])
async def get_movies(db: Session = database_movies, current_user: User = curr_user):
    my_movies = db.query(Movie).filter(Movie.user_id == current_user.id).all()
    return my_movies


@router.post("/my-movies", response_model=MoviePublic)
async def like_movie(
    payload: MovieCreate, db: Session = database_movies, current_user: User = curr_user
):
    movie = Movie(
        tmdb_id=payload.tmdb_id,
        title=payload.title,
        poster_path=payload.poster_path,
        user_id=current_user.id,
    )
    try:
        db.add(movie)
        db.commit()
        db.refresh(movie)
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=409, detail="Movie already liked")
    return movie
