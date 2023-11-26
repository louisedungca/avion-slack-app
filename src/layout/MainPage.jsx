import { Outlet, useLoaderData } from 'react-router';
import React, { useEffect, useState } from 'react';
import { channelDetailUrl } from '../utils';
import { useFetchChannels, useFetchUsers } from '../hooks';
import * as c from '../components';
import * as p from '../pages';
import * as l from '../layout';

const MainPage = () => {
  const { token, client, expiry, uid } = useLoaderData();
  const { users, error, isLoading, fetchData } = useFetchUsers();
  const { channels, error: fetchChannelsError, fetchData: fetchChannels, isLoading: channelsLoading } = useFetchChannels();

  const channelIDs = channels.map(channel => channel.id); 
  const [channelDetails, setChannelDetails] = useState([]);
  const [allChannelMembers, setAllChannelMembers] = useState([]);
  const [isDetailsLoading , setIsDetailsLoading] = useState(false);
  
  useEffect(() => {
    fetchData();
    fetchChannels();
  },[]);

  if (error || fetchChannelsError) {
    return <p.ErrorPage/>
  }

  async function fetchChannelDetails() {
    try {
      setIsDetailsLoading(true);
      
      const channelsDetailsArray = channelIDs.map(async (channelID) => {
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
  
        if (!response.ok) {
          throw new Error(`Failed to fetch channel details for ID ${channelID}`);
        }
  
        const result = await response.json();
        return result;
      });
  
      const allDetails = await Promise.all(channelsDetailsArray);
      console.log('@MainPage - channelsDetailsArray:', channelsDetailsArray);

      setChannelDetails(allDetails);
      console.log('@MainPage - channelDetails', channelDetails); 

      if(allDetails && channelDetails.length > 0) {
        const allMembersSet = new Set(channelDetails.flatMap(channel => 
          channel.data.channel_members.map(member => member.user_id)
        ));
        const members = users.filter(user => Array.from(allMembersSet).includes(user.id));
        
        setAllChannelMembers([members]);
        console.log('@MainPage - allChannelMembers', allChannelMembers);
      }
      
    } catch (error) {
      console.error('There was an error in fetching channel details:', error.message);
    } finally {
      setIsDetailsLoading(false);
    }
  };
  
  useEffect(() => {  
    fetchChannelDetails();    
  }, [channels.length, Outlet]);
  
  // console.log('@MainPage - users:', users);
  // console.log('@MainPage - channels:', channels);

  return (
    <main className='mainpage'>
      {
        isLoading || channelsLoading ? (
          <l.MainSkeleton />
        ) : (
          <>
            <c.Navbar />
            <section className='dashboard'>
              <Outlet context={{ 
                users, 
                channels, 
                allChannelMembers,
                isDetailsLoading, 
              }}/>
            </section>
          </>
        )
      }           
    </main>
  )
}

export default MainPage