import { InformationCircleIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import logo from '../../assets/smileylogo.png';
import React, { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';

import { getChnlMsgUrl, getLocalStorage } from '../../utils';
import { useFetch } from '../../hooks';
import * as c from '../../components';

function ChannelBox() {
  const loggedInUser = getLocalStorage('UserData');
  const { users, channels } = useOutletContext();  
  const { channel_id } = useParams();
  const channelID = +channel_id;  
  const channelDetails = channels.find(item => item.id === channelID) || [];

  console.log('@ChannelBox - channels:', channels);
  console.log('channelDetails', channelDetails);
  console.log('loggedin user id:', loggedInUser.id);

  const [messages, setMessages] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
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
          <div className="header-left">
            <i className='user-icon'><UserGroupIcon /></i>
            <p className='user-uid'>{channelDetails.name}</p> 
          </div>
          <div className="header-right">
            <i className='info-icon' onClick={() => setShowProfile(!showProfile)}><InformationCircleIcon /></i>
          </div>         
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

        <c.SendChat 
          userID={channelID} 
          receiverClass={'Channel'}
          onMessageSent={() => fetchMesg()}          
        />
      </div>

      {showProfile && (
        <c.Profile 
          users={users}
          channelDetails={channelDetails}
          loggedInUser={loggedInUser}
        />
      )}
    </section>
  )
}

export default ChannelBox
