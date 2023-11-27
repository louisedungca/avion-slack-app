import { StarIcon, FaceSmileIcon } from "@heroicons/react/24/solid";
import { NavLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Select from "react-select";

import { reactSelectStyles } from "../../utils";
import * as l from '../../layout';

function Chats({ favorites, options, isFetchChatLoading, filteredChats }) {
  const navigate = useNavigate();   
  const [selectedUser, setSelectedUser] = useState(null);

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
            ))}
        </div>
      </div>

      <div className="recents">
        <h5>Recent Chats</h5>
        <div className="sidelist">
          {isFetchChatLoading ? (
            <l.SidebarSkeleton />                        
            ) : (
              filteredChats && filteredChats.length > 0 &&
                filteredChats.map(chat => (
                  <NavLink 
                    className='sidelist-item'
                    key={chat.userID}
                    to={`${chat.userID}`}
                  >
                    <div className="sidebar-item-wrapper">
                      <i className='info-icon'><FaceSmileIcon/></i>
                      <div className="sidelist-item-text">
                        {chat.userID === chat.lastMessage.receiverID ? (
                          <small>
                            {chat.lastMessage.receiverEmail.split('@')[0]}
                          </small>
                        ) : (
                          <small>
                            {chat.lastMessage.senderEmail.split('@')[0]}
                          </small>
                        )}                        
                        {chat.userID === chat.lastMessage.receiverID ? (
                            <h6 className="sidelist-item-mesg">
                              You: {chat.lastMessage.body}
                            </h6>
                        ) : (
                          <h6 className="sidelist-item-mesg">
                            {chat.lastMessage.body}
                          </h6>
                        )}                          
                      </div>
                    </div>                              
                  </NavLink>
                )))}          
        </div>
      </div>
    </aside>      
  );  
}

export default Chats;
