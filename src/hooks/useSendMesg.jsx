import { useFetch } from './useFetch';
import { sendMsgUrl } from '../utils';
import { useState } from 'react';

export function useSendMesg(userID, receiverClass, onMessageSent) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { fetchData } = useFetch(sendMsgUrl, { method: 'POST' });

  async function sendMesg(message) {
    const requestBody = {
      receiver_id: +userID,
      receiver_class: receiverClass,
      body: message,
    };

    setIsLoading(true);

    try {
      const response = await fetchData(requestBody, { method: 'POST' });

      if (!response.ok) {
        throw new Error(response.data.message || 'Failed to send the message.');
      }

      onMessageSent();
    } catch (error) {
      console.error('Error in sending the message:', error);
      setError(error.message || 'Failed to send the message.');
    } finally {
      setIsLoading(false);
    }
  }

  return { sendMesg, isLoading, error };
}

/*
Usage:

// for dm
const { sendMessage, isLoading, error } = useSendMesg(userID, 'User', onMessageSent);

// for channel
const { sendMessage, isLoading, error } = useSendMesg(channelID, 'Channel', onMessageSent);

*/
