import { PencilSquareIcon, StarIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AsyncSelect from "react-select/async";
import { getLocalStorage } from "../../utils";

function Chats({ users }) {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState(() => getLocalStorage('Favorites') || []);
  const [selectedUser, setSelectedUser] = useState(null);
  const options = users.map((user) => ({
    value: user.id,
    label: user.uid,
  }));  

  useEffect(() => {
    setFavorites(getLocalStorage('Favorites') || []);
  }, [favorites]);

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
      {/* {selectedUser ? ` Selected User: ${selectedUser.label} (ID: ${selectedUser.value})` : ''} */}

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
        <h5>Recent Searches</h5>
      </div>
      
    </aside>      
  );  
}

export default Chats;
