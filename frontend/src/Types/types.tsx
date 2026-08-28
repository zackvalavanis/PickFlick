export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
  movies: Movie[]
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (newToken: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export interface Login {
  email: string;
  password: string;
}

export interface Register {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface MovieFilters {
  title?: string | null;
  genre?: number | null;
  year?: number | null;
  min_rating?: number | null
  cast?: string | null
  keywords?: string | null
  monetization_types?: string | null
}

export interface Movie {
  id: number
  title: string
  poster_path: string | null
  release_date?: string
  vote_average?: number
  overview?: string
  revenue?: number
  budget?: number
}