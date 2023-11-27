import { StarIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { ChatBubbleOvalLeftEllipsisIcon, StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import { useOutletContext, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import { useFetch } from '../../hooks';
import { formatTimestamp, getMsgUrl, setLocalStorage } from '../../utils';
import { SendChat } from '../../components';
import * as l from '../../layout';

function ChatBox() {
  const { users, favorites, setFavorites, fetchRecentChats } = useOutletContext();
  const { id } = useParams();
  const userID = +id;
  const user = users.find((item) => item.id === userID) || [];
  const [isFavorite, setIsFavorite] = useState(() => favorites.some((item) => item.id === userID));
  // console.log('@ChatBox - users:', users);
  const [messages, setMessages] = useState([]);
  const [reverseMesg, setReverseMesg] = useState([]);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const { data: mesgData, fetchData: fetchMesg } = useFetch(getMsgUrl(userID), { method: 'GET' });

  useEffect(() => {
    setIsFirstLoad(true);
      fetchMesg();
  }, [userID]);

  useEffect(() => {
    if (mesgData && mesgData.data) {
      setIsFirstLoad(false);

      const filteredMesgs = mesgData.data.filter((mesg, index, array) => {
        const isFiltered = (id) => array.findIndex((item) => item.id === id) === index;
  
        return isFiltered(mesg.id);
      });
  
      setMessages(filteredMesgs);
      setReverseMesg([...filteredMesgs].reverse());
      console.log('Fetched Channel Messages:', mesgData.data);
      console.log('Fetched Channel uniqueMessages:', filteredMesgs);
    }
  }, [mesgData]);

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

  function handleOnMesgSent() {
    fetchMesg();
    fetchRecentChats();
    setIsFirstLoad(false);

    console.log('@Chatbox: fetch:', fetchRecentChats());
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

        {
          isFirstLoad ? (
            <l.ChatboxSkeleton />
          ) : (
            <div className="mesgthread">
              {reverseMesg && reverseMesg.length > 0 ? 
                reverseMesg.map((message, index) => (
                  <div 
                    key={index}
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
                  <i className="logo"><ChatBubbleOvalLeftEllipsisIcon /></i>
                  <h3>You're starting a new conversation</h3>
                  <p>Type your first message below.</p>
                </div>
              }         
            </div>
          )
        }

        <SendChat 
          userID={userID} 
          receiverClass={'User'}
          onMessageSent={handleOnMesgSent}          
        />
      </div>         
    </section>
  )
}

export default ChatBox