import React, { createContext, useContext, useEffect, useState } from "react";
import { getLocalStorage, setLocalStorage, loginUrl, signupUrl, toastError, toastDefault } from "../utils";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  async function handleRequest(url, options = {} ) {
    try {
      // log req data
      console.log('Request data:', {
        method: options.method,
        body: JSON.stringify(options.body),
        url, 
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await fetch(url, {
        ...options,
        method: options.method,
        body: JSON.stringify(options.body),
        headers: { 'Content-Type': 'application/json' },
      });

      const headersArray = Array.from(response.headers.entries());
      const headersObject = Object.fromEntries(headersArray);

      if (response.status === 404) {
        throw new Error("This page doesn't exist.");
      } else if (response.status === 401) {
        throw new Error('Invalid username or password.');
      } else if (response.status === 422) {
        throw new Error('Account exists. Choose another email to create a new account.');
      } else if (!response.ok) {      
        const errorResponse = await response.json(); 
        throw new Error(errorResponse.message);
      } else {
        const data = await response.json();
        console.log('Response data:', data); 
        console.log('Headers:', headersObject);

        setLocalStorage('Headers', headersObject);
        console.log('Response data(Sign in/up):', data);
        handleAuth(data);
      }
      
      // toast
      if (url === loginUrl) {
        toastDefault('Hey, welcome back to Slackify!');
      } else if (url === signupUrl) {
        toastDefault('Welcome to Slackify!');
      }
    } catch (error) {
      setError(error.message);
      toastError('Oops! There was a problem with your request. Please try again.');
    };
  };

  async function login(formData) {
    const { userEmail, userPassword } = formData;

    await handleRequest(loginUrl, { 
      method: 'POST', 
      body: { 
        email: userEmail, 
        password: userPassword 
      }});
  };

  async function signup(formData) {
    const { userEmail, userPassword, confirmPassword } = formData;

    await handleRequest(signupUrl, { 
      method: 'POST', 
      body: { 
        email: userEmail, 
        password: userPassword, 
        password_confirmation: confirmPassword 
      }});
  };

  function handleAuth(data) {
    setUser(data.data);
    setLocalStorage('UserData', data.data);
  };

  function logout() {
    setUser(null);
    localStorage.removeItem('UserData');
    localStorage.removeItem('Headers');
    localStorage.removeItem('Favorites');

    toastDefault('See you again soon!');
  };

  useEffect(() => {
    const currentUser = getLocalStorage('UserData');
    const headers = getLocalStorage('Headers');
    const token = headers && headers['access-token'];

    if (currentUser && token) {
      setUser(currentUser);
    }
  }, []);

  return { user, error, login, signup, logout };
};