import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';
import { CreateChannel } from '../../pages';

function Channel({ users, channels, favorites }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  };

  function closeModal() {
    setIsModalOpen(false);
  };

  return (
    <aside className='aside-channel'>
      <div className="aside-title">
        <h3>Channels</h3>
        <PlusCircleIcon className="icon" onClick={openModal}/>
      </div>

      <CreateChannel 
        users={users} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />

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
                  {fave.name}
                </span>              
              </NavLink>
            ))}
        </div>
      </div>

      <div className="recents">
        <h5>All Channels</h5>
        {channels && channels.length > 0 && (
          <div className="thumbnail-container">
            {channels.reverse().map(channel => (
              <NavLink 
                key={channel.id} 
                to={`${channel.id}`}
                className="thumbnail-wrapper"
              >
                <p className='thumbnail-name channel'>{channel.name}</p>
                {/* <small>({channel.id})</small> */}
              </NavLink>
            ))}
          </div>
        )} 
      </div>  
    </aside>
  )
}

export default Channel
