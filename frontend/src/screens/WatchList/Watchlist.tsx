import { useAuth } from '../Auth/useAuth'
import './Watchlist.css'

export function WatchList() {
  const { user } = useAuth()
  const movies = user?.movies
  console.log(movies)


  return (
    <div>
      {movies?.map((m) => (
        <div key={m.id}>
          <h1>{m.title}</h1>
        </div>
      ))}
    </div>


  )
}