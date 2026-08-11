import './App.css'
import { RouterProvider, Outlet, createBrowserRouter } from "react-router";
import { Header } from './screens/Header/Header';
import { Footer } from './screens/Footer/Footer';
import { HomePage } from './screens/HomePage/HomePage';
import { MoviesPage } from './screens/MoviesPage/MoviesPage';
import { Profile } from './screens/Profile/Profile';
import { Login } from './screens/Auth/Login';
import { Register } from './screens/Auth/SignUp';
import { AuthProvider } from './screens/Auth/AuthProvider';

function App() {
  const router = createBrowserRouter([
    {
      element: (
        <div className='app-layout'>
          <Header />
          <Outlet />
          <Footer />
        </div>
      ),
      children: [
        { path: '/', element: <HomePage /> },
        { path: '/movies', element: <MoviesPage /> },
        { path: '/profile/{id}', element: <Profile /> },
        { path: '/login', element: <Login /> },
        { path: '/register', element: <Register /> }
      ]
    }
  ])

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
