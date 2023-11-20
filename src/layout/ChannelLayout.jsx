import React from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import { Channel } from '../pages';

function ChatLayout() {
  const users = useOutletContext();

  return (
    <section className='dashcontent'>
      <Channel users={users} />
      <Outlet context={users}/>
    </section>
  )
}

export default ChatLayout
