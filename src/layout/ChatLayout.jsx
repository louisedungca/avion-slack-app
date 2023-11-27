import React, { useEffect, useState } from 'react';
import { Outlet, useLoaderData, useOutletContext } from 'react-router-dom';
import { getLocalStorage, getMsgUrl } from '../utils';
import * as p from '../pages';
import * as l from '../layout';

function ChatLayout() {
  const { token, client, expiry, uid } = useLoaderData();
  const { users, channels, allChannelMembers, isDetailsLoading, fetchChannelDetails } = useOutletContext();
  const [favorites, setFavorites] = useState(() => getLocalStorage('Favorites') || []);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setFavorites(getLocalStorage('Favorites') || []);

    console.log('@ChatsLayout - Calling fetchChannelDetails');
    fetchChannelDetails().then(() => setIsLoading(false));
  }, []);

  console.log('@ChatsLayout - allChannelMembers:', allChannelMembers);

  const [recentChats, setRecentChats] = useState([]);
  const [filteredChats, setFilteredChats] = useState([]);
  const [isFetchChatLoading, setIsFetchChatLoading] = useState(false);
  const options = (allChannelMembers[0] || []).map((user) => ({
    value: user.id,
    label: user.uid,
  }));  
  
  // console.log('@Chats - options', options);

  async function fetchRecentChats() {
    setIsFetchChatLoading(true);
    const recentChatsPromises = options.map(async (user) => {
      const response = await fetch(getMsgUrl(user.value), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'access-token': token,
          'client': client,
          'expiry': expiry,
          'uid': uid,
        },
      });

      const messages = await response.json();
      return {
        userId: user.value,
        messages,
      };
    });

    const recentChatsData = await Promise.all(recentChatsPromises);
    setRecentChats(recentChatsData);
    setIsFetchChatLoading(false);
  };

  useEffect(() => {
    fetchRecentChats();
  }, [options.length]);  

  useEffect(() => {
    const filteredChats = recentChats
      .filter(item => item.messages.data.length > 0)
      .map(item => {
        const userID = item.userId;
        const lastMessage = item.messages.data[item.messages.data.length - 1];
        const lastMessageDetails = {
          body: lastMessage.body,
          senderID: lastMessage.sender.id,
          senderEmail: lastMessage.sender.uid,
          receiverID: lastMessage.receiver.id,
          receiverEmail: lastMessage.receiver.uid,
        };
      
        return {
          userID,
          lastMessage: lastMessageDetails,
        };
    });

    setFilteredChats(filteredChats);
  }, [recentChats]);

  console.log('@ChatLayout - recentChats:', recentChats);
  console.log('@ChatLayout - filtered:', filteredChats);
  
  return (
    <>
    {
      isLoading || isDetailsLoading ? (
        <l.MainSkeleton />
      ) : (
        <section className='dashcontent'>
          <p.Chats 
            users={users} 
            favorites={favorites} 
            allChannelMembers={allChannelMembers} 
            options={options}
            isFetchChatLoading={isFetchChatLoading}
            filteredChats={filteredChats}
          />
          <Outlet context={{
            users,
            channels,
            allChannelMembers,
            favorites, 
            setFavorites,
            fetchRecentChats,
          }}/>
        </section>
      )
    }
    
    </>
    
  )
}

export default ChatLayout
