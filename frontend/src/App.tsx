import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";

import { Header } from "./screens/Header/Header";
import { Footer } from "./screens/Footer/Footer";
import { HomePage } from "./screens/HomePage/HomePage";
import { MoviesPage } from "./screens/MoviesPage/MoviesPage";
import { Profile } from "./screens/Profile/Profile";
import { Login } from "./screens/Auth/Login";
import { Register } from "./screens/Auth/SignUp";
import { AuthProvider } from "./screens/Auth/AuthProvider";
import { MovieDetail } from "./screens/MoviesPage/MovieDetail";
import { WatchList } from "./screens/WatchList/Watchlist";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app-layout">
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Bounce}
          />

          <Header />
          <main className="app-main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/movies" element={<MoviesPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path='/movies/:id' element={<MovieDetail />} />
              <Route path='watchlist' element={<WatchList />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;