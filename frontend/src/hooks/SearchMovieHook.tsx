import { useEffect, useState } from "react"
import type { Movie } from "../../src/Types/types"


export function useSearchMovies() {

  const [movieTitle, setMovieTitle] = useState(
    () => localStorage.getItem("lastSearch") ?? ""
  )

  const [loading, setLoading] = useState(
    () => !!localStorage.getItem("lastSearch")
  )

  const [searchResults, setSearchResults] = useState<Movie[]>([])


  const fetchMovies = async (title: string): Promise<Movie[]> => {
    const params = new URLSearchParams({ query: title })
    const res = await fetch(`http://localhost:8000/movies/search?${params}`)
    if (!res.ok) throw new Error("Search failed")
    return res.json()
  }

  const searchMovies = async (title: string) => {
    if (!title.trim()) return
    setLoading(true)
    try {
      const data = await fetchMovies(title)
      setSearchResults(data)
      localStorage.setItem("lastSearch", title)
    } catch (error) {
      console.error("Couldn't find the title", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const last = localStorage.getItem("lastSearch")
    if (!last) return
    let cancelled = false
    fetchMovies(last)
      .then((data) => { if (!cancelled) setSearchResults(data) })
      .catch((error) => console.error(error))
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  return { movieTitle, setMovieTitle, loading, searchResults, searchMovies }
}
