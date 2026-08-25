import { useNavigate } from "react-router-dom"
import type { Movie } from "../../Types/types"
import './MovieCard.css'


export function MovieCard({ movie }: { movie: Movie }) {
  const navigate = useNavigate()
  return (
    <div>
      <div className="movie-card">
        <img
          onClick={() => navigate(`/movies/${movie.id}`, { state: movie })}
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/placeholder.png"
          }
          alt={movie.title}
        />
        <h3>{movie.title}</h3>
      </div>
    </div>
  )
}