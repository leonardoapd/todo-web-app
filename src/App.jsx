import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
// import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import SignUp from './pages/SignUp/SignUp';
import Users from './pages/Users/Users';
import authInterceptor from './helpers/auth-interceptor';

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
  {
    path: '/register',
    element: <SignUp />,
  },
  {
    path: '/users',
    element: <Users />,
  },
])


function App() {

  authInterceptor();
  
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;