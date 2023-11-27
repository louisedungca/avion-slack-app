import React from 'react';
import Skeleton from 'react-loading-skeleton';

function SidebarSkeleton() {
  return (
    <div className='sidelist-skeleton'>
      <div className="sidelist-item-skeleton">
        <Skeleton height={15} count={3}/>
      </div>      
    </div>
  )
}

export default SidebarSkeleton
