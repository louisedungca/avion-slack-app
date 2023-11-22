import React from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import { Chats } from '../pages';

function ChatLayout() {
  const users = useOutletContext();
  console.log('@ChatsLayout - users:', users);

  return (
    <section className='dashcontent'>
      <Chats users={users} />
      <Outlet context={users}/>
    </section>
  )
}

export default ChatLayout
