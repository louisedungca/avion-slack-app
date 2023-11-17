import React from 'react';
import { Outlet } from 'react-router';
import * as c from '../components';
import * as p from '../pages';

const MainPage = () => {
  return (
    <main className='mainpage'>
      <c.Navbar />
      <Outlet />
      <p.MsgThread />
    </main>
  )
}

export default MainPage