import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import { useFetchUsers } from '../hooks';
import * as c from '../components';
import * as p from '../pages';
import * as l from '../layout';

const MainPage = () => {
  const { users, error, isLoading, fetchData } = useFetchUsers();
  
  useEffect(() => {
    fetchData();
  },[]);

  if (error) {
    return <p.ErrorPage/>
  }

  console.log('@Main - users', users);

  return (
    <main className='mainpage'>
      {
        isLoading ? (
          <l.MainSkeleton />
        ) : (
          <>
            <c.Navbar />
            <section className='dashboard'>
              <Outlet context={users}/>
            </section>
          </>
        )
      }           
    </main>
  )
}

export default MainPage