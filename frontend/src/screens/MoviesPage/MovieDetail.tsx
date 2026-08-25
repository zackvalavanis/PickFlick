import { useLocation } from "react-router-dom"
import type { Movie } from "../../Types/types"

export function MovieDetail() {
  const location = useLocation()
  const movie = location.state as Movie

  if (!movie) return <p>No Movie Data</p>

  return (

    < div >
      <h1>
        {movie.title}
      </h1>
      <h1>
        KFBEBFHEBKEHVVHBEKHVBEHKBVKEHBVHB
      </h1>
    </div >

  )
}