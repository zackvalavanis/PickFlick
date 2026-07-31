import httpx

from app.config import settings

BASE_URL = "https://api.themoviedb.org/3"

HEADERS = {
    "Authorization": f"Bearer {settings.TMDB_ACCESS_TOKEN}",
    "accept": "application/json",
}

MOVIE_GENRE = [
    {"id": 28, "name": "Action"},
    {"id": 12, "name": "Abenteuer"},
    {"id": 16, "name": "Animation"},
    {"id": 35, "name": "Komödie"},
    {"id": 80, "name": "Krimi"},
    {"id": 99, "name": "Dokumentarfilm"},
    {"id": 18, "name": "Drama"},
    {"id": 10751, "name": "Familie"},
    {"id": 14, "name": "Fantasy"},
    {"id": 36, "name": "Historie"},
    {"id": 27, "name": "Horror"},
    {"id": 10402, "name": "Musik"},
    {"id": 9648, "name": "Mystery"},
    {"id": 10749, "name": "Liebesfilm"},
    {"id": 878, "name": "Science Fiction"},
    {"id": 10770, "name": "TV-Film"},
    {"id": 53, "name": "Thriller"},
    {"id": 10752, "name": "Kriegsfilm"},
    {"id": 37, "name": "Western"},
]


def genre_name_to_id(name: str) -> int | None:
    for g in MOVIE_GENRE:
        if g["name"].lower() == name.lower():
            return g["id"]
    return None


async def search_movies(query: str) -> dict:
    """Search movies by title"""
    async with httpx.AsyncClient() as client:
        resp = await client.get(
            f"{BASE_URL}/search/movie", headers=HEADERS, params={"query": query}
        )
        resp.raise_for_status()
        return resp.json()


async def discover_film(
    genre: int | None = None,
    year: int | None = None,
    min_rating: float | None = None,
    cast: str | None = None,
    keywords: str | None = None,
    monetization_types: str | None = None,
) -> dict:
    params = {}
    if genre:
        params["with_genres"] = genre
    if year:
        params["primary_release_year"] = year
    if min_rating:
        params["vote_average.gte"] = min_rating
    if cast:
        params["with_cast"] = cast
    if keywords:
        params["with_keywords"] = keywords
    if monetization_types:
        params["with_watch_monetization_types"] = monetization_types
    async with httpx.AsyncClient() as client:
        resp = await client.get(
            f"{BASE_URL}/discover/movie", headers=HEADERS, params=params
        )
        resp.raise_for_status()
        return resp.json()
