import React, { useEffect, useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import { getLocalStorage } from '../utils';
import { Chats } from '../pages';


function ChatLayout() {
  const { users, channels } = useOutletContext();
  const [favorites, setFavorites] = useState(() => getLocalStorage('Favorites') || []);
  console.log('@ChatsLayout - channels:', channels);

  useEffect(() => {
    setFavorites(getLocalStorage('Favorites') || []);
  }, []);

  return (
    <section className='dashcontent'>
      <Chats users={users} favorites={favorites} />
      <Outlet context={{
        users,
        favorites, 
        setFavorites,
      }}/>
    </section>
  )
}

export default ChatLayout
