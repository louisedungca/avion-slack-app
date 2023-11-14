import React from 'react';
import { Outlet } from 'react-router';

const MainPage = () => {
  return (
    <div>
      This is the main page.
      <Outlet />
    </div>
  )
}

export default MainPage