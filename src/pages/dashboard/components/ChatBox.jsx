import { UserCircleIcon } from '@heroicons/react/24/outline';
import { useOutletContext, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import { SendChat } from '../../../components';
import { useFetch } from '../../../hooks';
import { getMsgUrl } from '../../../utils';


function ChatBox() {
  const users = useOutletContext();
  const { id } = useParams();
  // console.log('Params ID:', id);

  const userID = +id;
  const user = users.find((item) => item.id === userID) || [];
  // console.log('User:', user);

  const [messages, setMessages] = useState([]);
  // const [isMessageSent, setIsMessageSent] = useState(false);
  const { data: mesgData, fetchData: fetchMesg } = useFetch(getMsgUrl(userID), { method: 'GET' });

  useEffect(() => {
      fetchMesg();

  }, [userID]);

  useEffect(() => {
    if (mesgData) {
      setMessages(mesgData.data);
      console.log('Fetched Messages:', mesgData.data);
    }
  }, [mesgData]);
  
  // for checking only -- delete later
  useEffect(() => { 
    console.log('Messages:', messages);
  }, [messages]);

  return (
    <section className='dashcontent'>
      <div className='chatbox'>
        <div className="chatbox-header">
          <i className='user-icon'><UserCircleIcon /></i>
          <p className='user-uid'>{user.uid}</p>     
        </div>

        <div className="mesgthread">
            {messages && messages.length > 0 && 
            messages.reverse().map((message) => (
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

        <SendChat 
          userID={userID} 
          onMessageSent={() => fetchMesg()}
        />

        {/* {isMessageSent && <small className='success-message'>Message sent!</small>}     */}
      </div>         
    </section>
  )
}

export default ChatBox