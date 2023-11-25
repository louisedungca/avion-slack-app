import React from 'react';
import { useAuth } from '../hooks';

function Logout({ isOpen, onClose }) {
  const logout = useAuth();

  function handleLogout() {
    logout();
    onClose();
  };
  
  function handleCancelLogout() {
    onClose();
  }

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
    <div className="modal-wrapper">
      <h4 className='modal-title'>Sign out of Hola</h4>
      <span className='modal-text'>We'll sign you out and remove any pinned users or channels.</span>

      <div className="modal-btns">
        <button className='modal-btn' type="submit" onClick={handleCancelLogout}>
          Cancel
        </button>
        <button className='modal-btn-signout' type="submit" onClick={handleLogout}>
          Sign out
        </button>     
      </div>
 
    </div>
  </div>
  )
}

export default Logout
