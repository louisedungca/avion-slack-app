import React from 'react';
import Skeleton from 'react-loading-skeleton';

function MainSkeleton() {
  return (
    <main className='mainpage-skeleton'>
      <nav className="navbar-skeleton">
        <Skeleton width={30} height={30} count={4}/>
      </nav>
      <section className="dashboard-skeleton">
        <aside className="aside-skeleton">
          <Skeleton height={20} count={4}/>
        </aside>        
        <div className="mesgbox-skeleton"></div>
      </section>
    </main>
  )
}

export default MainSkeleton
