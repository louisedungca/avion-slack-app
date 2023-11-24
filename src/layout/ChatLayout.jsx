import React, { useEffect, useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import { Chats } from '../pages';
import { getLocalStorage } from '../utils';

function ChatLayout() {
  const users = useOutletContext();
  const [favorites, setFavorites] = useState(() => getLocalStorage('Favorites') || []);

  useEffect(() => {
    setFavorites(getLocalStorage('Favorites') || []);
  }, []);

  // console.log('@ChatsLayout - users:', users);

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
