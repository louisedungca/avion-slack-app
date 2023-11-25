import React, { useEffect, useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import { getLocalStorage } from '../utils';
import { Chats } from '../pages';

function ChatLayout() {
  const { users, channels, allChannelMembers } = useOutletContext();
  const [favorites, setFavorites] = useState(() => getLocalStorage('Favorites') || []);
  console.log('@ChatsLayout - allChannelMembers:', allChannelMembers);

  useEffect(() => {
    setFavorites(getLocalStorage('Favorites') || []);
  }, []);

  return (
    <section className='dashcontent'>
      <Chats users={users} favorites={favorites} allChannelMembers={allChannelMembers} />
      <Outlet context={{
        users,
        channels,
        allChannelMembers,
        favorites, 
        setFavorites,
      }}/>
    </section>
  )
}

export default ChatLayout
