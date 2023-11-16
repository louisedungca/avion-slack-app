import React from 'react';
import { useAuth } from '../hooks';
import { Navigate, Routes } from 'react-router-dom';

function PrivateRoute({ children }) {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? (
    <Routes>{children}</Routes>
  ) : (
    <Navigate to={'/login'} replace />
  )
}

export default PrivateRoute
