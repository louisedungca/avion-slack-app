import React, { useEffect, useState } from 'react';

function useFetch(url, options) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setData(result);        
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, options.method]); 
  
  return [ data, error, isLoading ];
}

export default useFetch
