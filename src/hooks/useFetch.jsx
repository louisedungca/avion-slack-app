import { useState } from "react";
import { allUsersUrl, channelDetailUrl, getLocalStorage, usersChannelUrl } from "../utils";

export function useFetch(url, options = {}) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchData(requestBody) {
    try {
      setIsLoading(true);

      const headers = getLocalStorage('Headers');
      const token = headers && headers['access-token'];
      const client = headers && headers['client'];
      const expiry = headers && headers['expiry'];
      const uid = headers && headers['uid'];

      // log req data
      console.log('@useFetch Request data:', {
        method: options.method,
        body: JSON.stringify(requestBody),
        url, 
        headers: {
          'Content-Type': 'application/json',
          'access-token': token,
          'client': client,
          'expiry': expiry,
          'uid': uid,
          ...options.headers, 
        },
      });

      const response = await fetch(url, {
        ...options,
        method: options.method,
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
          'access-token': token,
          'client': client,
          'expiry': expiry,
          'uid': uid,
          ...options.headers, 
        },
      });
      const result = await response.json();

      // log response
      console.log('Response data:', result);

      if(!response.ok) {
        throw new Error(result.message || 'There was a problem in fetching the data.');
      }
      
      setData(result);
      return { response, result };
    } catch (error) {
      setError(error.message || 'An error occurred while fetching data.');
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, setError, isLoading, fetchData };
};

export function useFetchUsers() {
  const { data, error, isLoading, fetchData } = useFetch(allUsersUrl, { method: 'GET' });
  const users = data?.data || [];

  return { users, error, isLoading, fetchData };
};

export function useFetchChannels() {
  const { data, error, isLoading, fetchData } = useFetch(usersChannelUrl, { method: 'GET' });

  const channels = data?.data || [];

  return { channels, error, isLoading, fetchData };
};

export function useFetchChannelData(channelID) {
  const { data, error, isLoading, fetchData } = useFetch(channelDetailUrl(channelID), { method: 'GET' });
  const channelData = data?.data || [];

  return { channelData, error, isLoading, fetchData };
};