import { useEffect, useState } from "react";
import { getLocalStorage, setLocalStorage, loginUrl, signupUrl, toastError, toastDefault } from "../utils";
import { useNavigate } from "react-router-dom";

export function useFetchAuth() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleRequest(url, options = {}) {
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
        setLocalStorage('UserData', data.data);
        setUser(data.data);
        
        console.log('Response data(Sign in/up):', data);
      }

      // toast
      if (url === loginUrl) {
        toastDefault('Hey, welcome back to Slackify!');
      } else if (url === signupUrl) {
        toastDefault('Welcome to Slackify!');
      } 

      navigate('/c/channels');
    } catch (error) {
      setError(error.message);
      toastError('Oops! There was a problem with your request. Please try again.');
    }
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('UserData');
    localStorage.removeItem('Headers');
    localStorage.removeItem('Favorites');

    toastDefault('You are now signed out from Slackify. See you again soon!');
  }

  useEffect(() => {
    const currentUser = getLocalStorage('UserData');
    const headers = getLocalStorage('Headers');
    const token = headers && headers['access-token'];

    if (currentUser && token) {
      setUser(currentUser);
    }
  }, []);

  return { user, error, handleRequest, setUser, logout };
}