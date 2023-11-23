import logo from '../assets/smileylogo.png';
import React from 'react';
import { UserPlusIcon } from '@heroicons/react/24/outline';

function Profile({ users, channelDetails, loggedInUser }) {
  console.log('@Profile - channelDetails', channelDetails);
  console.log('@Profile - loggedin user id:', loggedInUser);
  console.log('@Profile - users:', users);

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
      </div>
      
    </section>
  )
}

export default Profile
