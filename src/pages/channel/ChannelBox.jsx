import { UserGroupIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';

import logo from '../../assets/smileylogo.png';
import { SendChat } from '../../components';
import { useFetch } from '../../hooks';
import { getChnlMsgUrl, getLocalStorage } from '../../utils';

function ChannelBox() {
  const { users, channels } = useOutletContext();
  // console.log('@ChannelBox - channels:', channels);
  const { channel_id } = useParams();
  const channelID = +channel_id;  
  const channelDetails = channels.find(item => item.id === channelID);
  console.log('channelDetails', channelDetails);
  const loggedInUser = getLocalStorage('UserData');
  console.log('loggedin user id:', loggedInUser.id);

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
              <>
                <div 
                  key={message.id}
                  className={`message-box ${message.sender.id === loggedInUser.id ? 'right' : 'left'}`}
                >
                  <div className='message'>
                    <p>{message.body}</p>  
                  </div>    
                </div>
                
                <small className={`message-box ${message.sender.id === loggedInUser.id ? 'right' : 'left'}`}>
                  {message.sender.uid}
                </small>
              </>              
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
