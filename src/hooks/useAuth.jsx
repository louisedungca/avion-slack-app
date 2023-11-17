import React, { createContext, useContext, useEffect, useState } from "react";
import { getLocalStorage, loginUrl, setLocalStorage, signupUrl } from "../utils";

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

  // for login fetch
  async function login(formData) {
    const { userEmail, userPassword } = formData;
    const requestBody = {
      email: userEmail,
      password: userPassword,
    };

    console.log('Request body:', JSON.stringify(requestBody));

    try {
      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      console.log('Response status:', response.status);

      const headersArray = Array.from(response.headers.entries());
      const headersObject = Object.fromEntries(headersArray);
      console.log('Headers object:', headersObject);

      if (response.status === 404) {
        setError("This page doesn't exist.");
      } else if (response.status === 401) {
        setError('Invalid username or password.');
      } else if (!response.ok) {      
        const errorResponse = await response.json(); 
        setError(errorResponse.message);
      } else {
        const data = await response.json();
        console.log('Response data:', data); 
        console.log('Headers:', headersObject);

        setLocalStorage('Headers', headersObject);
        console.log("DATA:", data);
        handleAuth(data);
      }
      
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  // for signup fetch 
  async function signup(formData) {
    const { userEmail, userPassword, confirmPassword } = formData;
    const requestBody = {
      email: userEmail,
      password: userPassword,
      password_confirmation: confirmPassword,
    };

    console.log('Request body:', JSON.stringify(requestBody));

    try {
      const response = await fetch(signupUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      console.log('Response status:', response.status);

      const headersArray = Array.from(response.headers.entries());
      const headersObject = Object.fromEntries(headersArray);
      console.log('Headers object:', headersObject);

      if (response.status === 404) {
        setError("This page doesn't exist.");
      } else if (response.status === 422) {
        setError('Account exists. Choose another email to create a new account.');
      } else if (!response.ok) {      
        const errorResponse = await response.json(); 
        setError(errorResponse.message);
      } else {
        const data = await response.json();
        console.log('Response data:', data); 
        console.log('Headers:', headersObject);

        setLocalStorage('Headers', headersObject);
        console.log("DATA:", data);
        handleAuth(data);
      }
      
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  function handleAuth(data) {     
    setUser(data.data);
    setLocalStorage('UserData', data.data);
  };

  function logout() {
    setUser(null);
    localStorage.removeItem('UserData');
    localStorage.removeItem('Headers');
  };

  useEffect(() => {
    const currentUser = getLocalStorage('UserData');
    const headers = getLocalStorage('Headers');
    const token = headers && headers['access-token'];
    console.log('Access Token:', token);

    if (currentUser && token) {
      setUser(currentUser);
    }
  }, []);

  return {
    user, 
    error,
    login,
    signup,
    logout,
  };
};