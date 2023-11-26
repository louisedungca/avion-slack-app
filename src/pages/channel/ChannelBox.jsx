import { InformationCircleIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';

import { formatTimestamp, getChnlMsgUrl, getLocalStorage } from '../../utils';
import { useFetch } from '../../hooks';
import * as c from '../../components';
import * as l from '../../layout';


function ChannelBox() {
  const loggedInUser = getLocalStorage('UserData');
  const { users, channels } = useOutletContext();  
  const { channel_id } = useParams();
  const channelID = +channel_id;  
  const channelDetails = channels.find(item => item.id === channelID) || [];

  // console.log('@ChannelBox - channels:', channels);
  // console.log('channelDetails', channelDetails);
  // console.log('loggedin user id:', loggedInUser.id);

  const [messages, setMessages] = useState([]);
  const [reverseMesg, setReverseMesg] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const { data: mesgData, fetchData: fetchMesg, isLoading } = useFetch(getChnlMsgUrl(channelID), { method: 'GET' });

  useEffect(() => {
    fetchMesg();
  }, [channelID]);

  useEffect(() => {
    if (mesgData && mesgData.data) {
      setMessages(mesgData.data);
      setReverseMesg([...mesgData.data].reverse());
      console.log('Fetched Channel Messages:', mesgData.data);
    }
  }, [mesgData]);

  // for checking only -- delete later
  useEffect(() => { 
    console.log('Channel Messages:', messages);
  }, [messages.length]);

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

        {
          isLoading ? (
            <l.ChatboxSkeleton />
          ) : (
            <div className="mesgthread">
              {reverseMesg && reverseMesg.length > 0 ? 
                reverseMesg.map((message) => (              
                  <div key={message.id}>
                    <div className={`message-box ${message.sender.id === loggedInUser.id ? 'right' : 'left'}`}>
                      <div className='message'>
                          <small className={`message-box ${message.sender.id === loggedInUser.id ? 'right channel' : 'left'}`}>
                            {message.sender.uid.split('@')[0]}
                          </small>
                        <p>{message.body}</p>  
                        <span className="timestamp">
                          {formatTimestamp(message.created_at)}
                        </span> 
                      </div>    
                    </div>
                  </div>              
                )) : <div className="startconvo-wrapper"> 
                      {/* <img src={logo} alt="logo" className="logo" /> */}
                      <i className="logo"><ChatBubbleOvalLeftEllipsisIcon /></i>
                      <h3>You're starting a new conversation</h3>
                      <p>Type your first message below.</p>
                    </div>
                }         
            </div>
          )
        }

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
        />
      )}
    </section>
  )
}

export default ChannelBox
