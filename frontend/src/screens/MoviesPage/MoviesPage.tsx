// import { useEffect } from "react"

import { MovieCard } from "./MovieCard"
import './MovieCard.css'
import './MoviesPage.css'
import { useSearchMovies } from "../../hooks/SearchMovieHook"


export function MoviesPage() {
  const { movieTitle, setMovieTitle, loading, searchResults, searchMovies } =
    useSearchMovies()


  // const discoverMovies = async (filters: MovieFilters) => {

  //   const params = new URLSearchParams()

  //   Object.entries(filters).forEach(([key, value]) => {
  //     if (value !== undefined && value !== null && value !== "") {
  //       params.append(key, String(value))
  //     }
  //   })

  //   setLoading(true)
  //   try {
  //     const res = await fetch(`http://localhost:8000/movies/discover?${params}`)
  //     if (!res.ok) {
  //       throw new Error("Failed to search")
  //     }
  //     const data = await res.json()
  //     console.log(data)
  //     setResults(data)
  //     return data
  //   } catch (error) {
  //     console.error("There was an error fetching the data", error)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  return (
    <div className="movies-page">
      <div className="search">
        <input
          type="text"
          placeholder="Search Movies..."
          value={movieTitle}
          onChange={(e) => setMovieTitle(e.target.value)}
        />
        <button onClick={() => searchMovies(movieTitle)}>Search</button>
      </div>

      {loading && <p>Searching...</p>}

      <div className="movie-grid">
        {searchResults.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}