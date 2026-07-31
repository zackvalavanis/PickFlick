import json

import anthropic

from app.config import settings
from app.utils import tmdb

client = anthropic.Anthropic(api_key=settings.ANTHROPIC_API_KEY)

MODEL = "claude-sonnet-4-6"

GENRE_HINT = ", ".join(f"{g['name']}={g['id']}" for g in tmdb.MOVIE_GENRE)

TOOLS = [
    {
        "name": "search_movies",
        "description": "Search for movies by title. Use when the user names or partially names a movie.",
        "input_schema": {
            "type": "object",
            "properties": {
                "query": {
                    "type": "string",
                    "description": "The movie title to search for",
                }
            },
            "required": ["query"],
        },
    },
    {
        "name": "discover_film",
        "description": "Search for movies by filters like genre, year, minimum rating, or cast. Use for requests like 'a western from the 70s' or 'highly rated sci-fi'. Genre must be a TMDB genre ID.",
        "input_schema": {
            "type": "object",
            "properties": {
                "genre": {
                    "type": "integer",
                    "description": f"TMDB genre ID. Options: {GENRE_HINT}",
                },
                "year": {"type": "integer"},
                "min_rating": {
                    "type": "number",
                    "description": "Minimum vote average, 0-10",
                },
                "cast": {"type": "string"},
                "keywords": {"type": "string"},
                "monetization_types": {"type": "string"},
            },
            "required": [],
        },
    },
]


async def dispatch_tool(name: str, args: dict) -> dict:
    if name == "search_movies":
        return await tmdb.search_movies(args["query"])
    if name == "discover_film":
        return await tmdb.discover_film(
            genre=args.get("genre"),
            year=args.get("year"),
            min_rating=args.get("min_rating"),
            cast=args.get("cast"),
            keywords=args.get("kerwords"),
            monetization_types=args.get("monetization_types"),
        )
    return {"error": f"Unknown tool: {name}"}


async def run_chat(message: str, history: list) -> str:
    system_prompt = (
        "You are a movie recommendation expert (think Christopher Nolan, Stanley Kubrik, Martin Scorsese,Steven Spielberg) for an app called PickFlick. "
        "Use the tools to look up real movies. When you recommend films, mention the "
        "title, year, and a one-line reason. Genre IDs: Action 28, Comedy 35, Drama 18, "
        "Horror 27, Sci-Fi 878, Thriller 53, Western 37, Romance 10749, Animation 16."
        "Recommend at most 3 films. For each, give title, year, rating, and ONE short sentence. "
        "Do not use section headers or categories. Keep the whole reply under 120 words."
    )

    messages = [{"role": m.role, "content": m.content} for m in history]
    messages.append({"role": "user", "content": message})

    while True:
        response = client.messages.create(
            model=MODEL,
            max_tokens=600,
            system=system_prompt,
            tools=TOOLS,
            messages=messages,
        )

        if response.stop_reason == "tool_use":
            messages.append({"role": "assistant", "content": response.content})
            tool_results = []
            for block in response.content:
                if block.type == "tool_use":
                    result = await dispatch_tool(block.name, block.input)
                    tool_results.append(
                        {
                            "type": "tool_result",
                            "tool_use_id": block.id,
                            "content": json.dumps(result),
                        }
                    )
            messages.append({"role": "user", "content": tool_results})
        else:
            # No more tools — Claude has its final answer.
            return "".join(b.text for b in response.content if b.type == "text")
