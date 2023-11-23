import { UserCircleIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import logo from '../assets/smileylogo.png';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useFetch, useFetchChannelData } from '../hooks';
import { AddMember } from '../pages';
import { addMemberUrl } from '../utils';

function Profile({ users, channelDetails }) {
  const channelID = +channelDetails.id;
  const channelOwnerID = +channelDetails.owner_id;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ownerDetails, setOwnerDetails] = useState([]);
  const [memberDetails, setMemberDetails] = useState([]);
  const [newMember, setNewMember] = useState(null);

  const { channelData, error: fetchChannelError, fetchData: fetchChannelData } = useFetchChannelData(channelID);
  const { fetchData: fetchAddMemberData, error: fetchAddMemberError, setError } = useFetch(addMemberUrl, { method: 'POST' });

  useEffect(() => {
    fetchChannelData();
  },[channelDetails]);

  if (fetchChannelError) {
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
  
      setOwnerDetails(ownerDetails);

      if (newMember) {
        setMemberDetails([...membersDetails, newMember]);
      } else {
        setMemberDetails(membersDetails);
      }
    }
  }, [users, channelData, channelOwnerID, newMember]);

  function openModal() {
    setIsModalOpen(true);
  };

  function closeModal() {
    setIsModalOpen(false);
  };

  async function onSubmit(formData) {
    const newMemberID = formData.channelUsers.value;
    const body = {
      id: +channelData.id,
      member_id: +newMemberID,
    };

    try {
      const { response, result } = await fetchAddMemberData(body);
      console.log('Create Channel Response:', response);
      console.log('@Channel result:', result);

      if(result.error) {
        throw new Error (result.error || 'There was a problem in adding new member(s).');
      }

      setNewMember(users.find(item => item.id === +newMemberID));
      closeModal();
    } catch (error) {
      setError(fetchAddMemberError);
      console.error(fetchAddMemberError);
    }
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
          onSubmit={onSubmit} 
        />
      )}
    </section>
  )
}

export default Profile
