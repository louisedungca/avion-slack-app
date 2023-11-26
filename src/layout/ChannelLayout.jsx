import React, { useEffect, useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import { getLocalStorage } from '../utils';
import * as p from '../pages';
import * as l from '../layout';

function ChannelLayout() {
  const { users, channels, isDetailsLoading, fetchChannels } = useOutletContext();  
  const [favorites, setFavorites] = useState(() => getLocalStorage('FaveChannels') || []);
  // console.log('@ChanLayout - fetchChannels:', fetchChannels);

  useEffect(() => {
    setFavorites(getLocalStorage('FaveChannels') || []);
  }, []);

  return (
    <>
    {
      isDetailsLoading ? (
        <l.MainSkeleton />
      ) : (
        <section className='dashcontent'>
          <p.Channel 
            users={users} 
            channels={channels}
            favorites={favorites}  
            fetchChannels={fetchChannels}
          />
          <Outlet context={{ 
            users, 
            channels,
            favorites, 
            setFavorites,
          }}/>
        </section>
      )
    }
    </>
  )
}

export default ChannelLayout
