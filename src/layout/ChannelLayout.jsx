import React, { useEffect, useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import { getLocalStorage } from '../utils';
import * as p from '../pages';
import * as l from '../layout';

function ChannelLayout() {
  const { users, channels, isDetailsLoading } = useOutletContext();
  // console.log('@ChanLayout - channels:', channels);

  const [favorites, setFavorites] = useState(() => getLocalStorage('FaveChannels') || []);

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
