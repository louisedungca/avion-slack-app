import React, { createContext, useContext, useEffect, useState } from "react";
import { getLocalStorage, setLocalStorage, loginUrl, signupUrl } from "../utils";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  async function handleRequest(url, options = {} ) {
    try {
      const response = await fetch(url, {
        ...options,
        method: options.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(options.body),
      });

      const headersArray = Array.from(response.headers.entries());
      const headersObject = Object.fromEntries(headersArray);

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Failed to fetch data.');
      }

      const data = await response.json();
      setLocalStorage('Headers', headersObject);
      handleAuth(data);
    } catch (error) {
      setError(error.message || 'An error occurred while fetching data.');
    }
  }

  async function login(formData) {
    const { userEmail, userPassword } = formData;
    await handleRequest(loginUrl, { method: 'POST', body: { email: userEmail, password: userPassword }});
  }

  async function signup(formData) {
    const { userEmail, userPassword, confirmPassword } = formData;
    await handleRequest(signupUrl, { method: 'POST', body: { email: userEmail, password: userPassword, password_confirmation: confirmPassword }});
  }

  function handleAuth(data) {
    setUser(data.data);
    setLocalStorage('UserData', data.data);
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('UserData');
    localStorage.removeItem('Headers');
  }

  useEffect(() => {
    const currentUser = getLocalStorage('UserData');
    const headers = getLocalStorage('Headers');
    const token = headers && headers['access-token'];

    if (currentUser && token) {
      setUser(currentUser);
    }
  }, []);

  return { user, error, login, signup, logout };
}


