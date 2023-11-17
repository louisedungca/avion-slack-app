import React, { useEffect } from 'react';
import { useFetchUsers } from '../../../hooks';

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

  // const last20Users = users.slice(-20);

  return (
    <aside className='aside-people'>
      <p>People</p>
      <ul>
        {users && users.slice(-20).map(user => (
          <li key={user.id}>{user.uid}</li>
        ))}
      </ul>
    </aside>
  )
}

export default People
