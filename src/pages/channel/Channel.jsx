import { PencilSquareIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import CreateChannel from './CreateChannel';

function Channel({ users }) {
  // console.log('@Channel:', users);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit = (data) => {
    // Handle form submission here
    console.log(data);
    // Close the modal or perform other actions
    closeModal();
  };

  return (
    <aside className='aside-channel'>
      <div className="aside-title">
        <h3>Channels</h3>
        <PencilSquareIcon className="icon" onClick={openModal}/>
      </div>

      <CreateChannel users={users} isOpen={isModalOpen} onClose={closeModal} onSubmit={onSubmit} />
    </aside>
  )
}

export default Channel
