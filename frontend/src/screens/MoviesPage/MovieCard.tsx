import { Link } from "react-router-dom"
import type { Movie } from "../../Types/types"


export function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Link to={`/movies/${movie.id}`} state={movie} className="movie-card">
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "/placeholder.png"
        }
        alt={movie.title}
      />
      <h3>{movie.title}</h3>
    </Link>
  )
}