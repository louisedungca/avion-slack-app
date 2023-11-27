import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { UserCircleIcon } from '@heroicons/react/24/solid';

function People() {
  const { users } = useOutletContext();

  function handleClickUser(selectedUser) {
    console.log('Selected User:', selectedUser)
  };

  return (
    <aside className='aside-people'>
      <h3 className='aside-title'>
        Recent Friends
      </h3>
      <div className='thumbnail-container'>
        {users && users.slice(-10).map(user => (
          <Link 
            key={user.id} 
            className='thumbnail-wrapper' 
            onClick={()=>{handleClickUser(user)}}
          >
            <i className='thumbnail-icon'><UserCircleIcon /></i>
            <p className='thumbnail-uid'>{user.uid}</p>            
          </Link>
        ))}
      </div>
    </aside>
  )
}

export default People
