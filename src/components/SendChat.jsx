import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { chatBoxInput, textAreaTemplate } from './formInput';
import { getLocalStorage, sendMsgUrl } from '../utils';


function SendChat({ userID, onMessageSent }) {
  const { register, handleSubmit, formState: { errors, isSubmitSuccessful }, reset } = useForm();  

  useEffect(() => {
    if(isSubmitSuccessful) {
      reset({ 
        sendMessage: '', 
      });
      onMessageSent();
    }

  }, [isSubmitSuccessful]);

  async function onSubmit(formData) {
    console.log('formData', formData);
    const { sendMessage } = formData;
    const requestBody = {
      receiver_id: +userID,
      receiver_class: 'User',
      body: sendMessage,
    };

    const headers = getLocalStorage('Headers');
    const token = headers && headers['access-token'];
    const client = headers && headers['client'];
    const expiry = headers && headers['expiry'];
    const uid = headers && headers['uid'];

    try {
      const response = await fetch(sendMsgUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'access-token': token,
          'client': client,
          'expiry': expiry,
          'uid': uid,
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();
      console.log('Response data:', result);

      if (!response.ok) {
        throw new Error(result.message || 'Failed to send the message.');
      }
    } catch (error) {
      console.error('Error in sending the message:', error);
      throw error;
    }
  };

  return (
    <div className='form-wrapper'>
      <form onSubmit={handleSubmit(onSubmit)} className='chatbox-form'>              
        {chatBoxInput.map(input => textAreaTemplate(input, register, errors))}

        <button
        type="submit"
        className='sendchat-btn'
        >
          <i><PaperAirplaneIcon width={20}/></i>
        </button>
      </form>   
    </div> 
  )
}

export default SendChat
