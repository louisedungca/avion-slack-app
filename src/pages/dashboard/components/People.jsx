import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { UserCircleIcon } from '@heroicons/react/24/solid';

function People() {
  const { users } = useOutletContext();
  // console.log('from Main:', users);

  function handleClickUser(selectedUser) {
    console.log('Selected User:', selectedUser)
  };

  return (
    <aside className='aside-people'>
      <h3 className='aside-title'>
        Recent Friends
      </h3>
      <div className='user-container'>
        {users && users.slice(-10).map(user => (
          <div 
            key={user.id} 
            className='user-wrapper' 
            onClick={()=>{handleClickUser(user)}}
          >
            <i className='user-icon'><UserCircleIcon /></i>
            <p className='user-uid'>{user.uid}</p>            
          </div>
        ))}
      </div>
    </aside>
  )
}

export default People
