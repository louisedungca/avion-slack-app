import { PencilSquareIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import CreateChannel from './CreateChannel';
import { useFetch } from '../../hooks';
import { createChannelUrl } from '../../utils';

function Channel({ users }) {
  const { channels } = useLoaderData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { fetchData, isLoading, error, setError } = useFetch(createChannelUrl, { method: 'POST' });

  function openModal() {
    setIsModalOpen(true);
  };

  function closeModal() {
    setIsModalOpen(false);
  };

  async function onSubmit(channelData) {
    const { channelUsers, channelName } = channelData
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

      // close modal onSubmit
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
        <PencilSquareIcon className="icon" onClick={openModal}/>
      </div>

      <CreateChannel 
        users={users} 
        error={error}
        isOpen={isModalOpen} 
        onClose={closeModal} 
        onSubmit={onSubmit} 
      />

      {channels && channels.length > 0 && (
          <div className="channel-list">
            {channels.map(channel => (
              <div key={channel.id} className="channel">
                <h4>{channel.name}</h4>
              </div>
            ))}
          </div>
        )
      }      
    </aside>
  )
}

export default Channel
