import React from 'react';
import { useOutletContext, useParams } from 'react-router-dom';

function ChannelBox() {
  const users = useOutletContext();
  const { channelID } = useParams();
  // console.log('ChannelID:', channelID);

  return (
    <div>
      This is the channel box.
    </div>
  )
}

export default ChannelBox
