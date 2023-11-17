import React from 'react';
import { useAuth } from '../hooks';
import { Navigate, Routes } from 'react-router-dom';

function PrivateRoute({ children }) {
  const { user } = useAuth();

  return user ? (
    <Routes>{children}</Routes>
  ) : (
    <Navigate to={'/login'} replace />
  )
}

export default PrivateRoute