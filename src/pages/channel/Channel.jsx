import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';

import { createChannelUrl } from '../../utils';
import { CreateChannel } from '../../pages';
import { useFetch } from '../../hooks';

function Channel({ users, channels }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { fetchData, error, setError } = useFetch(createChannelUrl, { method: 'POST' });

  function openModal() {
    setIsModalOpen(true);
  };

  function closeModal() {
    setIsModalOpen(false);
  };

  async function onSubmit(formData) {
    const { channelUsers, channelName } = formData;
    console.log('@CreateChannel - formData:', formData);
    console.log('channelName:', channelName);
    console.log('channelUsers:', channelUsers);

    const membersArray = channelUsers.map(member => member.value);
    console.log('membersArray:', membersArray);

    const body = {
      name: channelName,
      user_ids: membersArray,
    }

    try {
      const { response, result } = await fetchData(body);
      console.log('Create Channel Response:', response);
      console.log('@Channel result:', result);

      if(result.errors) {
        throw new Error (result.errors || 'There was a problem in creating a new channel.');
      }

      closeModal();
    } catch (error) {
      setError(error);
      console.error(error);
    }
  };

  return (
    <aside className='aside-channel'>
      <div className="aside-title">
        <h3>Channels</h3>
        <PlusCircleIcon className="icon" onClick={openModal}/>
      </div>

      <CreateChannel 
        users={users} 
        error={error}
        isOpen={isModalOpen} 
        onClose={closeModal} 
        onSubmit={onSubmit} 
      />

      {channels && channels.length > 0 && (
          <div className="thumbnail-container">
            {channels.reverse().map(channel => (
              <NavLink 
                key={channel.id} 
                to={`${channel.id}`}
                className="thumbnail-wrapper"
              >
                <p className='thumbnail-name channel'>{channel.name}</p>
                <small>({channel.id})</small>
              </NavLink>
            ))}
          </div>
        )
      }      
    </aside>
  )
}

export default Channel
