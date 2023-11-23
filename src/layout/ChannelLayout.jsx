import React, { useEffect } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import { useFetchChannels } from '../hooks';
import * as p from '../pages';
import * as l from '../layout';

function ChannelLayout() {
  const users = useOutletContext();
  const { channels, error, fetchData } = useFetchChannels();

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    return <p.ErrorPage/>
  }

  console.log('@ChanLayout - channels:', channels);
  // console.log('@ChanLayout - users:', users);

  return (
    <section className='dashcontent'>
      <p.Channel users={users} channels={channels} />
      <Outlet context={{ users, channels }}/>
    </section>
  )
}

export default ChannelLayout
