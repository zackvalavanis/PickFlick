import { useState } from "react"
import type { Login } from "../../Types/types"
import { FaEye, FaEyeSlash } from "react-icons/fa"

import './Login.css'
import { UseAuth } from "./UseAuth"
import { useNavigate } from "react-router"
import { Bounce, toast, ToastContainer } from "react-toastify"

export function Login() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = UseAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState<Login>({
    email: "",
    password: "",
  })



  const handleLogin = async (formData: Login) => {
    setLoading(true)

    try {
      const res = await fetch('http://localhost:8000/auth/login', {
        "method": "POST",
        "headers": {
          "Content-Type": "application/json"
        },
        "body": JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      })
      const data = await res.json()

      if (!res.ok) {
        return;
      }

      if (!data?.access_token) {
        console.log('No access token returned')
        return;
      }
      login(data.access_token)
      toast('Logged In successfully', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        onClose: () => navigate('/')
      });

    } catch (error) {
      console.log("There was an error", error)
    } finally {
      setLoading(false)
    }
  }




  return (
    <div className="login-page">
      < ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <div className="left-side">
        <div className="login-box">
          <div className='top-box'>
            <div className="reel">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="reel-hole" />
              ))}
            </div>
          </div>

          <form className='form-login' onSubmit={(e) => {
            e.preventDefault()
            handleLogin(formData)
          }}>

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
            <button type='submit'>Login</button>
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