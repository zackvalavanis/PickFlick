import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import "./HomePage.css";

export function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.justLoggedIn) {
      toast.success("Logged in successfully!", {
        toastId: "login-success",
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
        transition: Bounce,
      });
      // clear the flag so a refresh doesn't re-toast
      navigate(".", { replace: true, state: null });
    }
  }, [location.state, navigate]);

  return (
    <div className="home">
      <h1></h1>
    </div>
  );
}