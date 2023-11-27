import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

function WelcomeLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/login');
  }, []);


  return (
    <main className='mainpage'>
      <Outlet />   
    </main>
  )
}

export default WelcomeLayout
