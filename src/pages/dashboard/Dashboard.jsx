import React from 'react';
import { Outlet } from 'react-router-dom';

function Dashboard({ users }) {
  return (
    <aside className='aside-dashboard'>
      <Outlet />
    </aside>
  )
}

export default Dashboard
