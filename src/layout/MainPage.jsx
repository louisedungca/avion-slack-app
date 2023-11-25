import { Outlet } from 'react-router';
import React, { useEffect, useState } from 'react';
import { channelDetailUrl, getLocalStorage } from '../utils';
import { useFetchChannels, useFetchUsers } from '../hooks';
import * as c from '../components';
import * as p from '../pages';
import * as l from '../layout';


const MainPage = () => {
  const { users, error, isLoading, fetchData } = useFetchUsers();
  const { channels, error: fetchChannelsError, fetchData: fetchChannels, isLoading: channelsLoading } = useFetchChannels();

  const channelIDs = channels.map(channel => channel.id); 
  const [channelDetails, setChannelDetails] = useState([]);
  const [allChannelMembers, setAllChannelMembers] = useState([]);

  const headers = getLocalStorage ('Headers');
  const token = headers && headers['access-token'];
  const client = headers && headers['client'];
  const expiry = headers && headers['expiry'];
  const uid = headers && headers['uid'];
  
  useEffect(() => {
    fetchData();
    fetchChannels();
  },[]);

  if (error || fetchChannelsError) {
    return <p.ErrorPage/>
  }

  async function fetchChannelDetails() {
    const detailsPromises = channelIDs.map(async (channelID) => {
      const response = await fetch(channelDetailUrl(channelID), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'access-token': token,
          'client': client,
          'expiry': expiry,
          'uid': uid,
        },
      });

      const result = await response.json();
      return result;
    });

    const details = await Promise.all(detailsPromises);
    setChannelDetails(details);
  };
  
  useEffect(() => {  
    fetchChannelDetails();

    if(channelDetails && channelDetails.length > 0) {
      const allMembersSet = new Set(channelDetails.flatMap(channel => 
        channel.data.channel_members.map(member => member.user_id)
      ));
      const members = users.filter(user => Array.from(allMembersSet).includes(user.id));
      
      setAllChannelMembers([members]);
    }
  }, [channels.length]);

  
  console.log('@MainPage - allChannelMembers', allChannelMembers);
  console.log('@MainPage - channelDetails:', channelDetails);
  
  // console.log('@MainPage - users:', users);
  // console.log('@MainPage - channels:', channels);

  return (
    <main className='mainpage'>
      {
        isLoading ? (
          <l.MainSkeleton />
        ) : (
          <>
            <c.Navbar />
            <section className='dashboard'>
              <Outlet context={{ users, channels, allChannelMembers }}/>
            </section>
          </>
        )
      }           
    </main>
  )
}

export default MainPage