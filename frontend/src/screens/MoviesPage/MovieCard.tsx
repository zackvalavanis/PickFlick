import { useNavigate } from "react-router-dom"
import type { Movie } from "../../Types/types"
import './MovieCard.css'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import no_image from '../../assets/No_Image_Available.jpg'


export function MovieCard({ movie }: { movie: Movie }) {
  const navigate = useNavigate()
  const token = localStorage.getItem("access_token")

  const handleAddToWatchList = async (movie: Movie) => {
    console.log("adding to watchList")

    try {
      const res = await fetch(`http://localhost:8000/my-movies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ tmdb_id: movie.id, title: movie.title, poster_path: movie.poster_path }),
      })

      if (!res.ok) {
        throw new Error("Failed to add movie to watchlist")
      }
    } catch (error) {
      console.error("Error adding movie to watchlist:", error)
    }
  }


  return (
    <div>
      <div className="movie-card">
        <img
          onClick={() => navigate(`/movies/${movie.id}`, { state: movie })}
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : no_image
          }
          alt={movie.title}
        />
        <div className='movie-title-button'>
          <div className="left">

          </div>
          <div className="center">
            <h3>{movie.title}</h3>
          </div>
          <div className="right">
            <button onClick={() => handleAddToWatchList(movie)}><ThumbUpIcon /></button>
          </div>
        </div>
      </div>
    </div>
  )
}