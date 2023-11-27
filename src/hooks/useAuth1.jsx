import { useEffect, useState } from "react";
import { getLocalStorage, setLocalStorage, loginUrl, signupUrl, toastError, toastDefault } from "../utils";

export function useAuth() {
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

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'There was a problem in fetching the data.');
      }

      const data = await response.json();
      console.log('Response data(Sign in/up):', data);

      setLocalStorage('Headers', headersObject);
      handleAuth(data);
      
      // toast
      if (url === loginUrl) {
        toastDefault('Hey, welcome back to Slackify!');
      } else if (url === signupUrl) {
        toastDefault('Welcome to Slackify!');
      }
    } catch (error) {
      setError(error.message || 'An error occurred while fetching data.');
      toastError('Oops! There seems to be a problem with your request. Please try again.');
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