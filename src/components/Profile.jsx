import logo from '../assets/smileylogo.png';
import React, { useEffect, useState } from 'react';
import { UserCircleIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import { useFetchChannelData } from '../hooks';
import { Link } from 'react-router-dom';

function Profile({ users, channelDetails, loggedInUser }) {
  console.log('@Profile - channelDetails', channelDetails);
  console.log('@Profile - loggedin user id:', loggedInUser);
  console.log('@Profile - users:', users);

  const channelID = +channelDetails.id;
  const [memberDetails, setMemberDetails] = useState([]);
  const { channelData, error, isLoading, fetchData } = useFetchChannelData(channelID);

  useEffect(() => {
    fetchData();
  },[]);

  if (error) {
    return <p.ErrorPage/>
  }

  useEffect(() => {
    if (channelData && channelData.channel_members) {
      const membersID = channelData.channel_members.map(member => member.user_id);

      const details = membersID.map(memberID => {
        const user = users.find(item => item.id === memberID);
        return user;
      });

      console.log('@Profile - member details:', details);
      setMemberDetails(details);
    }
  }, [channelData, users]);

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
          <i className='content-icon'><UserPlusIcon /></i>
        </div>
        <div className="memberslist">
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
