import React from 'react';
import { useAuth } from '../hooks';
import { useNavigate } from 'react-router-dom';
import { getLocalStorage } from '../utils';

function Logout({ isOpen, onClose }) {
  const { uid, id } = getLocalStorage('UserData');
  const auth = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    auth.logout();
    onClose();
    navigate('/login');    
  };
  
  function handleCancelLogout() {
    onClose();
  }

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-wrapper">
        <h4 className='modal-title'>Sign out of Slackify</h4>
        <span className='modal-text'>We'll sign you out as {uid} (id: {id}).</span>
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
