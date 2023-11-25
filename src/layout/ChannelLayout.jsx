import React, { useEffect, useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import { useFetchChannels } from '../hooks';
import { channelDetailUrl, getLocalStorage } from '../utils';
import * as p from '../pages';

function ChannelLayout() {
  const users = useOutletContext();
  const { channels, error, fetchData, isLoading } = useFetchChannels();

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    return <p.ErrorPage/>
  }

  
  const channelIDs = channels.map(channel => channel.id);
  // console.log('@ChanLayout - channels:', channels);
  // console.log('@ChanLayout - channelIDs:', channelIDs);

  const [channelDetails, setChannelDetails] = useState([]);
  const headers = getLocalStorage('Headers');
  const token = headers && headers['access-token'];
  const client = headers && headers['client'];
  const expiry = headers && headers['expiry'];
  const uid = headers && headers['uid'];
  
  useEffect(() => {
    async function fetchChannelDetails() {
      const getDetails = channelIDs.map(async (channelID) => {
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

        // log response
        console.log('Response data:', result);
        return result;
      });

      const details = await Promise.all(getDetails);
      setChannelDetails(details);
    };

    fetchChannelDetails();
  }, []); 

  console.log('channelDetails:', channelDetails);


  return (
    <section className='dashcontent'>
      <p.Channel users={users} channels={channels} />
      <Outlet context={{ users, channels }}/>
    </section>
  )
}

export default ChannelLayout
