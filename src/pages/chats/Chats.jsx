import { StarIcon, FaceSmileIcon } from "@heroicons/react/24/solid";
import Select from "react-select";
import React, { useEffect, useState } from "react";
import { NavLink, useLoaderData, useNavigate } from "react-router-dom";
import { getMsgUrl, reactSelectStyles } from "../../utils";

function Chats({ users, favorites, allChannelMembers }) {
  const navigate = useNavigate(); 
  const { token, client, expiry, uid } = useLoaderData();
  const [selectedUser, setSelectedUser] = useState(null);
  const [recentChats, setRecentChats] = useState([]);
  const options = (allChannelMembers[0] || []).map((user) => ({
    value: user.id,
    label: user.uid,
  }));  
  
  console.log('@Chats - options', options);

  async function fetchRecentChats() {
    const recentChatsPromises = options.map(async (user) => {
      const response = await fetch(getMsgUrl(user.value), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'access-token': token,
          'client': client,
          'expiry': expiry,
          'uid': uid,
        },
      });

      const messages = await response.json();
      return {
        userId: user.value,
        messages,
      };
    });

    const recentChatsData = await Promise.all(recentChatsPromises);
    setRecentChats(recentChatsData);
  };

  useEffect(() => {
    fetchRecentChats();
  }, [options.length]);  

  console.log('@Chats - recentChats:', recentChats);

  function handleSelectedUser(selectedUser) {
    setSelectedUser(selectedUser);

    if (selectedUser) {
      navigate(`/c/chats/${selectedUser.value}`);
      console.log('Selected User:', selectedUser);
    }

    setSelectedUser(null);
  };

  const filteredChats = recentChats
    .filter(item => item.messages.data.length > 0)
    .map(item => {
      const userId = item.userId;
      const lastMessage = item.messages.data[item.messages.data.length - 1];
      const lastMessageDetails = {
        body: lastMessage.body,
        senderID: lastMessage.sender.id,
        senderEmail: lastMessage.sender.uid,
        receiverID: lastMessage.receiver.id,
        receiverEmail: lastMessage.receiver.uid,
      };
    
      return {
        userId,
        lastMessage: lastMessageDetails,
      };
    });
  
  console.log('@Chats - filteredChats:', filteredChats);  

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
          {filteredChats && filteredChats.length > 0 &&
            filteredChats.map(chat => (
              <NavLink 
                className='sidelist-item'
                key={chat.userId}
                to={`${chat.userId}`}
              >
                <div className="sidebar-item-wrapper">
                  <i className='info-icon'><FaceSmileIcon/></i>
                  <div className="sidelist-item-text">
                    <small>
                      {chat.lastMessage.receiverEmail.split('@')[0]}
                    </small>
                    <h6 className="sidelist-item-mesg">
                      {chat.lastMessage.body}
                    </h6>  
                  </div>
                </div>                              
              </NavLink>
            ))} 
        </div>
      </div>
    </aside>      
  );  
}

export default Chats;
