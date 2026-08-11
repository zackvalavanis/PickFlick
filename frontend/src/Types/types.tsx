export interface AuthContextType {
  user: User | null
  token: string | null
  login: (newToken: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

export interface User {
  token: string | null
  first_name: string
  last_name: string
}

export interface Login {
  email: string,
  password: string
}

export interface Register {
  first_name: string,
  last_name: string,
  email: string,
  password: string
}