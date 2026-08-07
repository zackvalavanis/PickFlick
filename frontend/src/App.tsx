import './App.css'
import { RouterProvider, Outlet, createBrowserRouter } from "react-router";
import { Header } from './screens/Header/Header';
import { Footer } from './screens/Footer/Footer';
import { HomePage } from './screens/HomePage/HomePage';

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
        { path: '/', element: <HomePage /> }
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
