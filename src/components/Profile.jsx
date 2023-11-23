import logo from '../assets/smileylogo.png';
import React, { useEffect, useState } from 'react';
import { UserCircleIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import { useFetchChannelData } from '../hooks';
import { Link } from 'react-router-dom';
import { AddMember } from '../pages';

function Profile({ users, channelDetails }) {
  // console.log('@Profile - channelOwner', channelOwnerID);
  // console.log('@Profile - users:', users);

  const channelID = +channelDetails.id;
  const channelOwnerID = +channelDetails.owner_id;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ownerDetails, setOwnerDetails] = useState([]);
  const [memberDetails, setMemberDetails] = useState([]);
  const { channelData, error, fetchData } = useFetchChannelData(channelID);

  useEffect(() => {
    fetchData();
  },[channelDetails]);

  if (error) {
    return <p.ErrorPage/>
  }

  useEffect(() => {
    if (channelData && channelData.channel_members) {
      const ownerDetails = users.find(item => item.id === channelOwnerID);
      const membersDetails = channelData.channel_members
        .filter(member => member.user_id !== channelOwnerID)
        .map(member => users.find(item => item.id === member.user_id));

      console.log('@Profile - member details:', membersDetails);
      console.log('@Profile - owner details:', ownerDetails);
  
      setMemberDetails(membersDetails);
      setOwnerDetails(ownerDetails);
    }
  }, [users, channelData, channelOwnerID]);

  function openModal() {
    setIsModalOpen(true);
  };

  function closeModal() {
    setIsModalOpen(false);
  };

  return (
    <section className='profile'>
      <div className="profile-header">
        <img src={logo} alt="logo" className='user-icon' />
        <p className='user-uid'>{channelDetails.name}</p> 
      </div>
      <div className="profile-content">
        <div className="content-title">
          <small>Who's in here</small>
          <i className='info-icon'><UserPlusIcon onClick={openModal}/></i>
        </div>
        <div className="memberslist">
          <Link 
            to={`/c/chats/${ownerDetails.id}`}
            className="owner"
          >
            <i className='info-icon'><UserCircleIcon /></i>
            <span>{ownerDetails.uid} <small>(Creator)</small> </span>     
          </Link>
          {memberDetails.map((member, index) => (
            <Link 
              to={`/c/chats/${member.id}`}
              key={index} 
              className='member'
            >
              <i className='info-icon'><UserCircleIcon /></i>
              <span>{member.uid}</span>
            </Link>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <AddMember
          users={users}
          channelData={channelData}
          isOpen={isModalOpen}
          onClose={closeModal}
          // onSubmit={/* your submit handler */
        />
      )}
      
    </section>
  )
}

export default Profile
