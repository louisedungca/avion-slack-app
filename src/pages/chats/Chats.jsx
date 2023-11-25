import { StarIcon } from "@heroicons/react/24/solid";
// import AsyncSelect from "react-select/async";
import Select from "react-select";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { reactSelectStyles } from "../../utils";

function Chats({ users, favorites, allChannelMembers }) {
  const navigate = useNavigate(); 
  const [selectedUser, setSelectedUser] = useState(null);
  const options = allChannelMembers[0].map((user) => ({
    value: user.id,
    label: user.uid,
  }));  

  console.log('@Chats - allChannelMembers', allChannelMembers);
  console.log('@Chats - options', options);

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

    setSelectedUser(null);
  };

  return (
    <aside className="aside-chats">
      <div className="aside-title">
        <h3>Direct Messages</h3>
      </div>

      <div className="search-user">
        <Select 
          placeholder='Enter email...'
          // loadOptions={loadOptions} 
          options={options}
          onChange={handleSelectedUser}
          value={selectedUser}
          styles={reactSelectStyles}
        />
      </div>

      <div className="favorites">
        <h5>Favorites</h5>
        <div className="sidelist">
          {favorites && favorites.length > 0 &&
            favorites.map(fave => (
              <NavLink 
                className='sidelist-item'
                key={fave.id}
                to={`${fave.id}`}
              >
                <i className='info-icon'><StarIcon/></i>
                <span>
                  {fave.uid.split('@')[0]}
                </span>              
              </NavLink>
            ))
          }
        </div>
      </div>

      <div className="recentsearch">
        <h5>Recent Chats</h5>
      </div>
    </aside>      
  );  
}

export default Chats;
