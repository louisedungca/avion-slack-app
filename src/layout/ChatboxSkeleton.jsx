import React from 'react';
import Skeleton from 'react-loading-skeleton';

function ChatboxSkeleton() {
  return (
    <div className="mesgthread-skeleton">
      <div className="message-skeleton">
        <div className="message-box-left-skeleton">
          <Skeleton height={30} width={250} count={2} />
          <Skeleton height={30} width={150} />
        </div>  
        <div className="message-box-right-skeleton">
          <Skeleton height={30} width={220} count={1}/>
          <Skeleton height={30} width={250} count={1}/>
        </div>  
      </div>                 
    </div>
  )
}

export default ChatboxSkeleton
