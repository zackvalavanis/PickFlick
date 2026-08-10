

export interface User {
  token: string | null
  first_name: string
  last_name: string
}

export interface Login {
  first_name: string,
  last_name: string,
  email: string,
  password: string
}