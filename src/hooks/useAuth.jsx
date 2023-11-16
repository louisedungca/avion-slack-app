import React, { createContext, useContext, useState } from 'react';
import { getLocalStorage } from '../utils';

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);

  const headers = getLocalStorage('headers') || [];
  const token = headers['access-token'];
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  const login = (userData, token) => {
    setAuthUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setAuthUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('headers');
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
