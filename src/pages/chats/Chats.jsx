import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { useNavigate, useOutletContext } from "react-router-dom";

function Chats() {
  const users = useOutletContext();
  const navigate = useNavigate();
  const options = users.map((user) => ({
    value: user.id,
    label: user.uid,
  }));

  const [selectedUser, setSelectedUser] = useState(null);

  function loadOptions(searchValue, callback) {
    const filteredOptions = options.filter((user) =>
        user.label.toLowerCase().includes(searchValue.toLowerCase())
      );
      setTimeout(() => {     
        callback(filteredOptions);
      }, 800);
  }

  function handleSelectedUser(selectedUser) {
    setSelectedUser(selectedUser);

    if (selectedUser) {
      navigate(`/c/chats/${selectedUser.value}`);
      console.log('Selected User:', selectedUser);
    }
  };

  function handleClickNewChat() {
    // setSearchFocus(true);
  };

  return (
      <aside className="aside-chats">
        <div className="aside-title">
          <h3>Chats</h3>
          <PencilSquareIcon className="icon" onClick={handleClickNewChat}/>
        </div>

        <div className="search-user">
          <AsyncSelect 
            placeholder='Enter email...'
            loadOptions={loadOptions} 
            onChange={handleSelectedUser}
          />
        </div>
        {selectedUser ? ` Selected User: ${selectedUser.label} (ID: ${selectedUser.value})` : ''}
      </aside>      
  );  
}

export default Chats;
