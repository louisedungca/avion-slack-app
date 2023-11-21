import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { chatBoxInput, textAreaTemplate } from './formInput';
import { useSendMesg } from '../hooks';

function SendChat({ userID, onMessageSent }) {
  const { register, handleSubmit, formState: { errors, isSubmitSuccessful }, reset } = useForm();  
  const { sendMesg } = useSendMesg(userID, 'User', onMessageSent);

  useEffect(() => {
    if(isSubmitSuccessful) {
      reset({ 
        sendMessage: '', 
      });

      onMessageSent();
    }

  }, [isSubmitSuccessful]);

  function onSubmit(formData) {
    const { sendMessage } = formData;
    sendMesg(sendMessage);   
  };

  return (
    <div className='form-wrapper'>
      <form 
        onSubmit={handleSubmit(onSubmit)} className='chatbox-form'
      >              
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
