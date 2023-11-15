import { RouterProvider, createBrowserRouter } from "react-router-dom";
import * as l from './layout';
import * as p from './pages';
import './App.css';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <p.WelcomePage />,
      errorElement: <p.ErrorPage />,
    },
    {
      path: 'signup',
      element: <p.SignUpPage />, 
      errorElement: <p.ErrorPage />,
    },
    {
      path: 'login',
      element: <p.LoginPage />,
      errorElement: <p.ErrorPage />,
    },
    {
      path: 'c',
      element: <l.MainPage />,
      errorElement: <p.ErrorPage />,
      children: [
        {
          index: true,
          element: <p.Dashboard />,
          errorElement: <p.ErrorPage />,
        },
        {
          path: 'profile',
          element: <p.Profile />,
          errorElement: <p.ErrorPage />,
        },
      ],
    },
    
    
  ]);

  return <RouterProvider router={router} />
}

export default App