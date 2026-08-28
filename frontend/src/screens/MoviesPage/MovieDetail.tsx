import { useLocation } from "react-router-dom"
import type { Movie } from "../../Types/types"
import { useEffect, useState } from "react"
import no_image from '../../assets/No_Image_Available.jpg'

export function MovieDetail() {
  const location = useLocation()
  const [movie, setMovie] = useState<Movie>(location.state as Movie)
  const [loading, setLoading] = useState(false)
  const profit = (movie.revenue ?? 0) - (movie.budget ?? 0)

  useEffect(() => {
    if (!movie?.id) return

    const MovieDetail = async (id: number) => {
      setLoading(true)
      try {
        const res = await fetch(`http://localhost:8000/movies/${id}`)
        if (!res.ok) {
          console.log("Failed to recieved a response")
          return
        }
        const data = await res.json()
        setMovie((prev) => ({ ...prev, ...data }))
      } catch (error) {
        console.log("There was an error", error)
      } finally {
        setLoading(false)
      }
    }
    MovieDetail(movie.id)
  }, [])

  console.log(movie)


  if (!movie) return <p>No Movie Data</p>

  return (

    < div >

      <p>{loading ? "Loading..." : ""}</p>

      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : no_image
        }
        alt={movie.title}
      />
      <h1>
        {movie.title}
      </h1>
      <p>{movie.overview}</p>
      <h2>Where to Watch</h2>



      <h2>Revenue</h2>
      <p>Budget: {movie.budget}</p>
      <p>Revenue: {movie.revenue}</p>
      <p>Profit: {profit}</p>

    </div >

  )
}