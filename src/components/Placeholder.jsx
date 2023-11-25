import React from 'react';
import logo from '../assets/smileylogo.png';


function Placeholder({ type }) {
  return (
    <div className="chatbox placeholder">
      <img src={logo} alt="logo" className="logo" />
      <h3>No {type} selected</h3>
    </div>
  )
}

export default Placeholder
