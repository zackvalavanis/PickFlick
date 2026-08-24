import { useState } from "react"
import type { Register } from "../../Types/types"
import { FaEye, FaEyeSlash } from "react-icons/fa"

import './SignUp.css'

export function Register() {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState<Register>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  })



  const handleRegister = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    console.log("Log in", loading)

    try {
      const res = await fetch('http://localhost:8000/users', {
        "method": "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          password: formData.password,
        }
        )
      }
      )

      if (!res.ok) {
        console.log("There was an error processing your request.")
      }
      const data = await res.json()

      console.log("USER DATA", data)

    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
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

          <form className='form-login' onSubmit={handleRegister}>
            <input
              name='first_name'
              placeholder="First Name"
              type='text'
              onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
            />
            <input
              name='last_name'
              placeholder="Last Name"
              type='text'
              onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
            />
            <input
              name='email'
              placeholder="Email"
              type='email'
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
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
            <button type='submit'>Sign Up</button>
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