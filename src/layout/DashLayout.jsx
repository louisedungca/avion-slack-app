import React from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';

function DashLayout() {
  const users = useOutletContext();

  return (
    <section className='dashcontent'>
      <Outlet context={users} />
    </section>
  )
}

export default DashLayout
