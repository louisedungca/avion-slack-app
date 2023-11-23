import logo from '../assets/smileylogo.png';
import React, { useEffect, useState } from 'react';
import { UserCircleIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import { useFetchChannelData } from '../hooks';
import { Link } from 'react-router-dom';

function Profile({ users, channelDetails, loggedInUser }) {
  // console.log('@Profile - channelOwner', channelOwnerID);
  // console.log('@Profile - loggedin user id:', loggedInUser);
  // console.log('@Profile - users:', users);

  const channelID = +channelDetails.id;
  const channelOwnerID = +channelDetails.owner_id;

  const [ownerDetails, setOwnerDetails] = useState([]);
  const [memberDetails, setMemberDetails] = useState([]);
  const { channelData, error, isLoading, fetchData } = useFetchChannelData(channelID);

  useEffect(() => {
    fetchData();
  },[channelDetails]);

  if (error) {
    return <p.ErrorPage/>
  }

  useEffect(() => {
    if (channelData && channelData.channel_members) {
      const ownerDetails = users.find(item => item.id === channelOwnerID);
      const details = channelData.channel_members
        .filter(member => member.user_id !== channelOwnerID)
        .map(member => users.find(item => item.id === member.user_id));

      console.log('@Profile - member details:', details);
      console.log('@Profile - owner details:', ownerDetails);
  
      setMemberDetails(details);
      setOwnerDetails(ownerDetails);
    }
  }, [channelData, users, channelOwnerID]);

  return (
    <section className='profile'>
      <div className="profile-header">
        {/* <i className='user-icon'><UserGroupIcon /></i> */}
        <img src={logo} alt="logo" className='user-icon' />
        <p className='user-uid'>{channelDetails.name}</p> 
      </div>
      <div className="profile-content">
        <div className="content-title">
          <small>Who's in here</small>
          <i className='info-icon'><UserPlusIcon /></i>
        </div>
        <div className="memberslist">
          <div className="owner">
            <i className='info-icon'><UserCircleIcon /></i>
            <span>{ownerDetails.uid} <small>(Creator)</small> </span>     
          </div>
          {memberDetails.map((member, index) => (
            <Link key={index} className='member'>
              <i className='info-icon'><UserCircleIcon /></i>
              <span>{member.uid}</span>
            </Link>
          ))}
        </div>
      </div>
      
    </section>
  )
}

export default Profile
