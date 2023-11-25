import { useEffect, useState } from 'react';
import { getLocalStorage } from '../utils';

export function useFetchAll(ids, url) {
  const [details, setDetails] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchDetails() {
    const headers = getLocalStorage('Headers');
    const token = headers && headers['access-token'];
    const client = headers && headers['client'];
    const expiry = headers && headers['expiry'];
    const uid = headers && headers['uid'];

    try {
      const detailsArray = ids.map(async (id) => {

         // log req data
         console.log('@useFetchAll Request data:', {
          url, 
          headers: {
            'Content-Type': 'application/json',
            'access-token': token,
            'client': client,
            'expiry': expiry,
            'uid': uid,
          },
        });

        const response = await fetch(url(id), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'access-token': token,
            'client': client,
            'expiry': expiry,
            'uid': uid,
          },
        });

        console.log('@useFetchAll response', response);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch details for ID ${id}`);
        }

        const result = await response.json();
        return result;
      });

      const allDetails = await Promise.all(detailsArray);
      setDetails(allDetails);
      console.log('@useFetchAll - details', details);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    };
  };

  useEffect(() => {
    console.log('@useFetchAll - details', details);
  }, [details]);

  return { details, error, isLoading, fetchDetails };
}
