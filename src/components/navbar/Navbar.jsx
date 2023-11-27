import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { NavbarData, Logout } from '../../components';


function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  };

  function closeModal() {
    setIsModalOpen(false);
  };

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
          <div 
            className={'lower-item logouticon'}
            onClick={openModal}
          >
             <i className="navbar-icons">
              <ArrowLeftOnRectangleIcon />
            </i>      
          </div>
        </div>
      </div>  

      <Logout 
        isOpen={isModalOpen} 
        onClose={closeModal}
      />     
    </nav>
  )
}

export default Navbar
