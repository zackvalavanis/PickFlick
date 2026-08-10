import { useState } from "react"
import type { Login } from "../../Types/types"
import { FaEye, FaEyeSlash } from "react-icons/fa"

import './Login.css'

export function Login() {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState<Login>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  })



  const handleLogin = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    console.log("Log in")
  }




  return (
    <div className="login-page">
      <div className="left-side">
        <div className="login-box">
          <div className='top-box'>
            <div className="reel">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="reel-hole" />
              ))}
            </div>
          </div>

          <form className='form-login' onSubmit={handleLogin}>
            <input name='first_name' placeholder="First Name" type='text' />
            <input name='last_name' placeholder="Last Name" type='text' />
            <input name='email' placeholder="Email" type='email' />
            <div style={{ position: "relative" }}>
              <input
                id='passwordField'
                name='password'
                placeholder="Password"
                type={showPassword ? 'text' : 'password'}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                style={{ paddingRight: "40px" }}
              />
              <span
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer"
                }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </form>

          <div className='bottom-box'>
            <div className="reel">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="reel-hole" />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='right-side'>
      </div>
    </div>
  )
}