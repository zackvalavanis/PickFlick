// import { useEffect } from "react"

import { useState } from "react"
import type { Movie } from "../../Types/types"
import { MovieCard } from "./MovieCard"
import './MovieCard.css'
import './MoviesPage.css'

export function MoviesPage() {
  // const [query, setQuery] = useState("")
  const [movieTitle, setMovieTitle] = useState("")
  const [loading, setLoading] = useState(false)
  // const [results, setResults] = useState<Movie[]>([]) //Need to add typing here
  const [searchResults, setSearchResults] = useState<Movie[]>([]) //Need to add typing here



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

  const searchMovies = async (title: string) => {
    const params = new URLSearchParams({ query: title })
    setLoading(true)


    try {
      const res = await fetch(`http://localhost:8000/movies/search?${params}`)
      const data = await res.json()
      console.log(data)
      setSearchResults(data)
      return data
    } catch (error) {
      console.error("Couldnt find the title", error)
    } finally {
      setLoading(false)
    }
  }

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