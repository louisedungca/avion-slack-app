import React from 'react';
import { Outlet } from 'react-router-dom';

function DashLayout() {
  return (
    <section>
      <Outlet />
    </section>
  )
}

export default DashLayout
