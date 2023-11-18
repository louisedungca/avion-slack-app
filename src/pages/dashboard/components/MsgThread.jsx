import React, { useEffect, useRef } from 'react';
import AsyncSelect from "react-select/async";

function MsgThread(props) {
  const { users, searchFocus, setSearchFocus } = props;
  const searchRef = useRef(null);
  console.log('from Main to MsgBox:', users);

  const options = users.map((user) => ({
    value: user.id,
    label: user.uid,
  }));

  useEffect(() => {
    if(searchFocus && searchRef.current) {
      searchRef.current.focus();
    };
  }, [searchFocus]);

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
    setSearchFocus(false);
  };

  return (
    <section className='msg-thread'>
      <div className="search-user">
        <AsyncSelect 
          placeholder='Enter email...'
          loadOptions={loadOptions} 
          onChange={handleSelect}
          ref={searchRef}
        />
      </div>        
    </section>
  )
}

export default MsgThread
