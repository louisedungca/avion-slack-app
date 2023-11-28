import React from 'react';
import smileylogo from '../../assets/smileylogo.png';
import { useNavigate } from 'react-router-dom';

function WelcomeNavbar() {
  const navigate = useNavigate();
  return (
    <nav className='welcomenav'>
      <div className="logonav">
        <img src={smileylogo} alt="slackify-logo" className='logo-img'/>
        <h2 className='brand-title'>Slackify</h2>
      </div>

      <div className="welcomenav-btns">
        <button 
          className='welcome-btn outline'
          onClick={() => {navigate('/signup')}}
        >
          Create Account
        </button>

        <button 
          className='welcome-btn'
          onClick={() => {navigate('/login')}}
        >
          Login
        </button>
      </div>
      

      
    </nav>
  )
}

export default WelcomeNavbar
