import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import React from 'react';
import './App.css';
import * as l from './layout';
import * as p from './pages';
import * as c from './components';
import * as h from './hooks';
import * as u from './utils';


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
      loader: u.isLoggedInLoader,
    },
    {
      path: 'login',
      element: <p.LoginPage />,
      errorElement: <p.ErrorPage />,
      loader: u.isLoggedInLoader,
    },
    {
      path: 'c',
      element: <l.MainPage />,
      errorElement: <p.ErrorPage />,
      loader: u.accessDashLoader,
      children: [
        {
          path: 'chats',
          element: <l.DashLayout />,
          errorElement: <p.ErrorPage />,
          loader: u.accessDashLoader,
          children: [
            {
              index: true,
              element: <p.Chats />,
              errorElement: <p.ErrorPage />,
              loader: u.accessDashLoader,
            },
            {
              path: ':id',
              element: <p.ChatBox />,
              errorElement: <p.ErrorPage />,
              loader: u.accessDashLoader,
            }
          ],
        },
        {
          path: 'channels',
          element: <p.Channel />,
          errorElement: <p.ErrorPage />,
          loader: u.accessDashLoader,
        },
        {
          path: 'people',
          element: <p.People />,
          errorElement: <p.ErrorPage />,
          loader: u.accessDashLoader,
        },
        {
          path: 'profile',
          element: <p.Profile />,
          errorElement: <p.ErrorPage />,
          loader: u.accessDashLoader,
        },
      ],
    },

  ]);

  return (
    <h.AuthProvider>
      <RouterProvider router={router} />    
    </h.AuthProvider>
  );
}

export default App;
