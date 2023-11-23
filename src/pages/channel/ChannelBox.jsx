import { UserGroupIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';

import logo from '../../assets/smileylogo.png';
import { SendChat } from '../../components';
import { useFetch } from '../../hooks';
import { getChnlMsgUrl } from '../../utils';

function ChannelBox() {
  const { users, channels } = useOutletContext();
   console.log('@ChannelBox - channels:', channels);
  // console.log('@ChannelBox - users:', users);

  const { channel_id } = useParams();
  const channelID = +channel_id;
  
  const channelDetails = channels.find(item => item.id === channelID);
  console.log('channelDetails', channelDetails);

  const [messages, setMessages] = useState([]);
  const { data: mesgData, fetchData: fetchMesg } = useFetch(getChnlMsgUrl(channelID), { method: 'GET' });

  useEffect(() => {
    fetchMesg();
  }, [channelID]);

  useEffect(() => {
    if (mesgData) {
      setMessages(mesgData.data);
      console.log('Fetched Channel Messages:', mesgData.data);
    }
  }, [mesgData]);

  // for checking only -- delete later
  useEffect(() => { 
    console.log('Channel Messages:', messages);
  }, [messages]);

  return (
    <section className='dashcontent'>
      <div className="chatbox">
        <div className="chatbox-header">
          <i className='user-icon'><UserGroupIcon /></i>
          <p className='user-uid'>{channelDetails.name}</p>     
        </div>

        <div className="mesgthread">
          {messages && messages.length > 0 ? 
            messages.reverse().map((message) => (
              <div 
                key={message.id}
                // className={`message-box ${message.sender.id === userID ? 'left' : ''} ${message.receiver.id === userID ? 'right' : ''}`}
              >
                <div className='message'>
                  <p>{message.body}</p>  

                  {/* Delete later */}
                  {/* <small>Receiver: {message.receiver.email} (ID: {message.receiver.id})</small>   
                  <small>Sender: {message.sender.email} (ID: {message.sender.id})
                  </small>                */}
                </div>    
              </div>
            )) : <div className="startconvo-wrapper">
                  <img src={logo} alt="logo" className="logo" />
                  <h3>You're starting a new conversation</h3>
                  <p>Type your first message below.</p>
                </div>
            }         
        </div>

        <SendChat 
          userID={channelID} 
          receiverClass={'Channel'}
          onMessageSent={() => fetchMesg()}          
        />
      </div>
    </section>
  )
}

export default ChannelBox
