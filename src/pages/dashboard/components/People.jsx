import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { UserCircleIcon } from '@heroicons/react/24/solid';

function People() {
  const users = useOutletContext();
  console.log('from Main:', users);

  return (
    <aside className='aside-people'>
      <h3 className='aside-title'>People</h3>
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
