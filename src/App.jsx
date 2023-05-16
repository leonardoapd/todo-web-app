import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';

const router = createBrowserRouter([
  // List of routes
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  // {
  //   path: '/home',
  //   action: () => import('./pages/Home/Home.jsx'),
  // },
])


function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
