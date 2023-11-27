import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import * as c from '../components';

function WelcomeLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/login');
  }, []);


  return (
    <main className='mainpage'>
      <c.WelcomeNavbar />   
      <Outlet />   
    </main>
  )
}

export default WelcomeLayout
