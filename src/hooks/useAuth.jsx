import React, { createContext, useContext, useState } from 'react';
import { getLocalStorage, setLocalStorage } from '../utils';

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);

  // Check if the access token is present in local storage
  const headers = getLocalStorage('headers') || [];
  const token = headers['access-token'];
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  const login = (user, token) => {
    setAuthUser(user);
    setIsLoggedIn(true);
    setLocalStorage('access-token', token);
  };

  const logout = () => {
    setAuthUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('access-token');
  };

  const value = {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
