import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useOutletContext, useParams } from 'react-router-dom';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { chatBoxInput, textAreaTemplate } from '../../../components';
import Chats from './Chats';


function ChatBox() {
  const users = useOutletContext();
  const { id } = useParams();
  const { register, handleSubmit, formState: { errors, isSubmitSuccessful }, reset } = useForm();    
  // console.log('Params ID:', id);

  const userID = +id;
  const user = users.find((item) => item.id === userID);
  console.log('User:', user);
  
  useEffect(() => {
    if(isSubmitSuccessful) {
      reset({ 
        sendMessage: '', 
      });
    }

  }, [isSubmitSuccessful]);

  function onSubmit(formData) {
    console.log(formData);
    // send message logic
    // display sent message logic
  };

  return (
    <section className='dashcontent'>
      <Chats />
      <div className='chatbox'>
        <div className="chatbox-header">
          <i className='user-icon'><UserCircleIcon /></i>
          <p className='user-uid'>{user.uid}</p>     
        </div>
        <div className="mesgthread"></div>
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
      </div>    
    </section>
  )
}

export default ChatBox