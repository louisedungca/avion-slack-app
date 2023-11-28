import React from 'react';
import { useFetchAuth } from '../hooks';
import { useNavigate } from 'react-router-dom';
import { getLocalStorage } from '../utils';

function Logout({ isOpen, onClose }) {
  const { uid } = getLocalStorage('UserData') || [];
  const { logout } = useFetchAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    onClose();
    navigate('/');    
  };
  
  function handleCancelLogout() {
    onClose();
  }

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-wrapper">
        <h4 className='modal-title'>Sign out of Slackify</h4>
        <span className='modal-text'>We'll sign you out as {uid}.</span>
        <small>This will also remove all of your pinned users or channels.</small>

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
