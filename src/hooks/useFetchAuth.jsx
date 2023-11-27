import { useState } from 'react';
import { setLocalStorage } from '../utils';

export function useFetchAuth(url, options = {}) {
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchData(requestBody) {
    try {
      setIsLoading(true);
      // log req data
      console.log('@useFetch Request data:', {
        method: options.method,
        body: JSON.stringify(requestBody),
        url, 
        headers: { 'Content-Type': 'application/json' },
      });
      
      const response = await fetch(url, {
        ...options,
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' },
      });

      const headersArray = Array.from(response.headers.entries());
      const headersObject = Object.fromEntries(headersArray);

      if (!response.ok) {
        const errorResponse = await response.json();
        // console.log('ErrorResponse:', errorResponse.errors[0]);
        throw new Error(errorResponse.errors[0] || 'There was an error in your request. Please try again.');        
      } 
      const data = await response.json(); 
      setUser(data.data);

      setLocalStorage('Headers', headersObject);      
      setLocalStorage('UserData', data.data);

      // log response
      console.log('Response data:', data);  
      console.log('Response user:', user);  
      return data;            
    } catch (error) {
      setError(error.message || 'There was an error in your request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return { user, error, setError, isLoading, fetchData };
}