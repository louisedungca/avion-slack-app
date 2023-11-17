import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { NavbarData } from '../../components';
import { ArrowLeftOnRectangleIcon, UserCircleIcon } from '@heroicons/react/24/solid';

function Navbar() {
  return (
    <nav className='navbar'>

      <div className="side-item-wrapper">       

        <div className="upper-items">
          {NavbarData.map((item, index) => {
            return (
              <NavLink
                key={index}
                className="upper-item"
                to={item.link}
              >
                <i className="navbar-icons">{item.icon}</i>
              </NavLink>
            );
          })}
        </div>

        <div className="lower-items">
          <NavLink
            to={'profile'}
            className={'lower-item usericon'}
          >
            {/* <div className="img-wrapper">
              <img src={profile} alt="profile picture" className="client-navbar-img" />
            </div> */}
            <i className="navbar-icons"><UserCircleIcon /></i>
          </NavLink>

          <Link
            className={'lower-item logouticon'}
          >
             <i className="navbar-icons"><ArrowLeftOnRectangleIcon /></i>
            
          </Link>
        </div>
      </div>
      
    </nav>
  )
}

export default Navbar
