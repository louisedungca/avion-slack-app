import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { useFetchUsers } from '../hooks';
import * as c from '../components';
import * as p from '../pages';
import * as l from '../layout';

const MainPage = () => {
  const { users, error, isLoading, fetchData } = useFetchUsers();
  const [searchFocus, setSearchFocus] = useState(false);

  useEffect(() => {
    fetchData();
  },[]);

  if (error) {
    return <p.ErrorPage/>
  }

  return (
    <main className='mainpage'>
      {
        isLoading ? (
          <l.MainSkeleton />
        ) : (
          <>
            <c.Navbar />
            <section className='dashboard'>
              <Outlet context={{ users, searchFocus, setSearchFocus }} />
              <p.MsgThread 
                users={users} 
                searchFocus={searchFocus}
                setSearchFocus={setSearchFocus}
              />
            </section>
          </>
        )
      }           
    </main>
  )
}

export default MainPage