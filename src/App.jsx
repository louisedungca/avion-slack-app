import { RouterProvider, createBrowserRouter, Route } from 'react-router-dom';
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
      path: 'c/*',
      element: (
        <c.PrivateRoute> 
            <Route path="/" element={<l.MainPage />}>
              <Route 
                index 
                element={<p.Dashboard />}
              /> 
                <Route
                    path='chats'
                    element={<p.Chats />} 
                  />
                <Route
                  path="channels"
                  element={<p.Channel />} 
                />
                <Route
                  path="people"
                  element={<p.People />} 
                />                            
            </Route>   
        </c.PrivateRoute>
      )
    }
  ]);

  return (
    <h.AuthProvider>
      <RouterProvider router={router} />
    </h.AuthProvider>
  );
}

export default App;
