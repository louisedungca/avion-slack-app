import React, { useEffect } from 'react';
import { useFetchUsers } from '../../../hooks';
import { Link } from 'react-router-dom';
import { UserCircleIcon } from '@heroicons/react/24/solid';

function People() {
  const { users, error, isLoading, fetchData } = useFetchUsers();

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <aside className='aside-people'>
      <p className='aside-title'>People</p>
      <div className='user-container'>
        {users && users.slice(-10).map(user => (
          <Link key={user.id} className='user-wrapper'>
            <i className='user-icon'><UserCircleIcon /></i>
            <p className='user-uid'>{user.uid}</p>            
          </Link>
        ))}
      </div>
    </aside>
  )
}

export default People
