import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as c from '../components';
import { useSendMesg } from '../hooks';

function SendChat({ userID, receiverClass, onMessageSent }) {
  const { register, handleSubmit, formState: { errors, isSubmitSuccessful }, reset } = useForm();  
  const { sendMesg, isLoading } = useSendMesg(userID, receiverClass, onMessageSent);

  useEffect(() => {
    if(isSubmitSuccessful) {
      reset({ 
        sendMessage: '', 
      });

      onMessageSent();
    }
  }, [isSubmitSuccessful]);

  async function onSubmit(formData) {
    const { sendMessage } = formData;
    await sendMesg(sendMessage);   
  };

  return (
    <div className='form-wrapper'>
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className='chatbox-form'
        style={{ opacity: isLoading ? 0.5 : 1 }}
      >              
        {c.chatBoxInput.map(input => c.textAreaTemplate(input, register, errors))}

        <button
          type="submit"
          className='sendchat-btn'
          disabled={isLoading}
        >
          <i><PaperAirplaneIcon width={20}/></i>
        </button>
      </form>   
    </div> 
  )
}

export default SendChat