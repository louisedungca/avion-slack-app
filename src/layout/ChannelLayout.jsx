import React from 'react';
import { Outlet, useLoaderData, useOutletContext } from 'react-router-dom';
import { Channel } from '../pages';

function ChannelLayout() {
  const users = useOutletContext();
  console.log('@ChanLayout - users:', users);

  const { channels } = useLoaderData();
  console.log('@ChanLayout - channels:', channels);

  return (
    <section className='dashcontent'>
      <Channel users={users} channels={channels} />
      <Outlet context={{ users, channels }}/>
    </section>
  )
}

export default ChannelLayout
