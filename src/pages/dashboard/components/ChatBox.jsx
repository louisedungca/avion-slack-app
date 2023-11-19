import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { useOutletContext, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { chatBoxInput, textAreaTemplate } from '../../../components';
import { useFetch } from '../../../hooks';
import { formatTimestamp, getMsgUrl } from '../../../utils';
import Chats from './Chats';


function ChatBox() {
  const users = useOutletContext();
  const { id } = useParams();
  const { register, handleSubmit, formState: { errors, isSubmitSuccessful }, reset } = useForm();    
  // console.log('Params ID:', id);

  const userID = +id;
  const user = users.find((item) => item.id === userID);
  console.log('User:', user);

  const [messages, setMessages] = useState([]);
  const { data, error, isLoading, fetchData } = useFetch(getMsgUrl(userID), { method: 'GET' });

  useEffect(() => {
    fetchData();
  }, [userID]);

  useEffect(() => {
    if (data) {
      setMessages(data.data);
      console.log('Fetched Messages:', data.data);
    }
  }, [data]);
  
  useEffect(() => {
    console.log('Messages:', messages);
  }, [messages]);
  
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

        <div className="mesgthread">
            {messages && messages.length > 0 && 
            messages.map((message) => (
              <div 
                key={message.id}
                className={`message-box ${message.sender.id === userID ? 'left' : ''} ${message.receiver.id === userID ? 'right' : ''}`}
              >
                <div className='message'>
                  <p>{message.body}</p>  

                  {/* Delete later */}
                  <small>Receiver: {message.receiver.email} (ID: {message.receiver.id})</small>   
                  <small>Sender: {message.sender.email} (ID: {message.sender.id})
                  </small>               
                </div>    
              </div>
            ))
          }
        </div>

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