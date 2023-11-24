import { StarIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import { useOutletContext, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import logo from '../../assets/smileylogo.png';
import { useFetch } from '../../hooks';
import { formatTimestamp, getMsgUrl, setLocalStorage } from '../../utils';
import { SendChat } from '../../components';

function ChatBox() {
  const { users, favorites, setFavorites} = useOutletContext();
  const { id } = useParams();
  const userID = +id;
  const user = users.find((item) => item.id === userID) || [];
  
  const [isFavorite, setIsFavorite] = useState(() => favorites.some((item) => item.id === userID));
  const [messages, setMessages] = useState([]);
  const [reverseMesg, setReverseMesg] = useState([]);
  const { data: mesgData, fetchData: fetchMesg } = useFetch(getMsgUrl(userID), { method: 'GET' });

  // console.log('@ChatBox - users:', users);

  useEffect(() => {
      fetchMesg();
  }, [userID]);

  useEffect(() => {
    if (mesgData && mesgData.data) {
      setMessages(mesgData.data);
      setReverseMesg([...mesgData.data].reverse());
      console.log('Fetched Channel Messages:', mesgData.data);
    }
  }, [mesgData]);
  
  // for checking only -- delete later
  useEffect(() => { 
    console.log('Messages:', messages);
  }, [messages]);

  useEffect(() => {
    setIsFavorite(favorites.some(item => item.id === userID));
  }, [userID]);

  function handleStarUser() {
    const starredUser = {
      id: user.id,
      uid: user.uid,
    }

    setFavorites((prevFavorites) => {
      const isStarredUser = prevFavorites.some((item) => item.id === starredUser.id);
      const updatedFavorites = isStarredUser
        ? prevFavorites.filter((item) => item.id !== starredUser.id)
        : [...prevFavorites, starredUser];
  
      setLocalStorage('Favorites', updatedFavorites);
      return updatedFavorites;
    });
  
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
  };

  return (
    <section className='dashcontent'>
      <div className='chatbox'>
        <div className="chatbox-header">
        <div className="header-left">
          <i className='user-icon'><UserCircleIcon /></i>
          <p className='user-uid'>{user.uid}</p>     
        </div>
        <div className="header-right">
          
          {
            isFavorite ? (
              <i className='info-icon'onClick={handleStarUser}><StarSolidIcon/></i>
            ) : (
              <i className='info-icon'onClick={handleStarUser}><StarIcon/></i>
            )
          }
          
        </div>     
        </div>

        <div className="mesgthread">
          {reverseMesg && reverseMesg.length > 0 ? 
            reverseMesg.map((message) => (
              <div 
                key={message.id}
                className={`message-box ${message.sender.id === userID ? 'left' : ''} ${message.receiver.id === userID ? 'right' : ''}`}
              >
                <div className='message'>
                  <p>{message.body}</p>  
                  <span className="timestamp">
                    {formatTimestamp(message.created_at)}
                  </span> 
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
          userID={userID} 
          receiverClass={'User'}
          onMessageSent={() => fetchMesg()}          
        />
      </div>         
    </section>
  )
}

export default ChatBox