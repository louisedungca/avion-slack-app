import React from 'react';
import AsyncSelect from "react-select/async";
import { useData } from '../../../hooks';

function MsgThread(props) {
  const { users } = props;
  console.log('from Main to MsgBox:', users);

  const { selectedUser, setSelectedUser } = useData();

  // cb
  function handleUserSelect(user) {
    setSelectedUser(user);
  };

  const options = users.map((user) => ({
    value: user.id,
    label: user.uid,
  }));

  function loadOptions(searchValue, callback) {
    const filteredOptions = options.filter((user) =>
        user.label.toLowerCase().includes(searchValue.toLowerCase())
      );
      setTimeout(() => {     
        callback(filteredOptions);
      }, 800);
  }

  function handleSelect(selectedUser) {
    console.log('Selected User:', selectedUser);
  };

  return (
    <section className='msg-thread'>
      <div className="search-user">
        <AsyncSelect 
          placeholder='Enter email...'
          loadOptions={loadOptions} 
          onChange={handleSelect}
        />
      </div>        
    </section>
  )
}

export default MsgThread
