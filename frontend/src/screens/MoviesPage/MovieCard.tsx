import { useNavigate } from "react-router-dom"
import type { Movie } from "../../Types/types"
import './MovieCard.css'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import no_image from '../../assets/No_Image_Available.jpg'


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
            <button><ThumbUpIcon /></button>
          </div>
        </div>
      </div>
    </div>
  )
}