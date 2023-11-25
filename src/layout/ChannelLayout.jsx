import React from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import * as p from '../pages';

function ChannelLayout() {
  const { users, channels } = useOutletContext();
  console.log('@ChanLayout - channels:', channels);

  return (
    <section className='dashcontent'>
      <p.Channel users={users} channels={channels} />
      <Outlet context={{ users, channels }}/>
    </section>
  )
}

export default ChannelLayout
