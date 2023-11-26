import React, { useEffect, useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import { getLocalStorage } from '../utils';
import * as p from '../pages';
import * as l from '../layout';

function ChatLayout() {
  const { users, channels, allChannelMembers, isDetailsLoading, fetchChannelDetails } = useOutletContext();
  const [favorites, setFavorites] = useState(() => getLocalStorage('Favorites') || []);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setFavorites(getLocalStorage('Favorites') || []);

    console.log('@ChatsLayout - Calling fetchChannelDetails');
    fetchChannelDetails().then(() => setIsLoading(false));
  }, []);

  console.log('@ChatsLayout - allChannelMembers:', allChannelMembers);

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
          />
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
    
    </>
    
  )
}

export default ChatLayout
