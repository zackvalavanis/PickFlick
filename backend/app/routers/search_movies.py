from fastapi import APIRouter, Depends

from app.database import get_db
from app.schemas.ChatRequest import ChatRequest, ChatResponse, Message
from app.utils import claude_agent, tmdb

router = APIRouter()
db_dependency = Depends(get_db)


@router.get("/movies/search")
async def search(query: str):
    movie = await tmdb.search_movies(query)
    return movie["results"]


@router.get("/movies/discover")
async def discover(
    genre: int | None = None,
    year: int | None = None,
    min_rating: float | None = None,
    cast: str | None = None,
    keywords: str | None = None,
    monetization_types: str | None = None,
):
    discovered_film = await tmdb.discover_film(
        genre, year, min_rating, cast, keywords, monetization_types
    )
    return discovered_film["results"]


@router.get("/movies/{id}")
async def get_movie(id: int):
    return await tmdb.get_movie_details(id)


@router.post("/movies/chat", response_model=ChatResponse)
async def chat(body: ChatRequest):
    reply = await claude_agent.run_chat(body.message, body.history)
    return ChatResponse(reply=reply)
