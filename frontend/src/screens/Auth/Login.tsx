import { useState } from "react";
import type { Login as LoginType } from "../../Types/types";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import "./Login.css";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

export function Login() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState<LoginType>({
    email: "",
    password: "",
  });

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.detail || "Invalid email or password", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
          transition: Bounce,
        });

        return;
      }

      if (!data?.access_token) {
        toast.error("Login failed: no access token returned.", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
          transition: Bounce,
        });

        return;
      }

      /*
       * login() stores the token and updates the AuthProvider.
       * Awaiting it allows the authentication flow to complete
       * before we navigate away from the login page.
       */
      await login(data.access_token);
      navigate('/', { state: { justLoggedIn: true } })


    } catch (error) {
      console.error("There was an error logging in:", error);

      toast.error("Unable to connect to the server.", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
        transition: Bounce,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="left-side">
        <div className="login-box">
          <div className="top-box">
            <div className="reel">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="reel-hole" />
              ))}
            </div>
          </div>

          <form className="form-login" onSubmit={handleLogin}>
            <input
              name="email"
              placeholder="Email"
              type="email"
              value={formData.email}
              autoComplete="email"
              required
              disabled={loading}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
            />

            <div style={{ position: "relative" }}>
              <input
                id="passwordField"
                name="password"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                autoComplete="current-password"
                required
                disabled={loading}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
                style={{
                  paddingRight: "40px",
                }}
              />

              <button
                type="button"
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
                onClick={() => setShowPassword((prev) => !prev)}
                disabled={loading}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: loading ? "default" : "pointer",
                  background: "none",
                  border: "none",
                  padding: 0,
                  color: "inherit",
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="bottom-box">
            <div className="reel">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="reel-hole" />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="right-side"></div>
    </div>
  );
}