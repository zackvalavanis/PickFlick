import { useEffect } from "react"
import { UseAuth } from "./UseAuth"
import { useNavigate } from "react-router"

export function Logout() {
  const { logout } = UseAuth()
  const navigate = useNavigate()

  useEffect(() => {
    logout()
    navigate('/login', { replace: true })
  }, [])

  return null
}