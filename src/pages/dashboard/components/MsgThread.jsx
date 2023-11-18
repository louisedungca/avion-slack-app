import React, { useState } from 'react';

import ConvoBox from './ConvoBox';

function MsgThread(props) {
  const { users } = props;

  return (
    <section className='msg-thread'>  
      {/* <ConvoBox users={users} selectedUser={selectedUser} />    */}
    </section>
  )
}

export default MsgThread
