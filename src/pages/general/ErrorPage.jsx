import React from 'react';
import { Link, useNavigate, useRouteError } from 'react-router-dom';
import { ArrowUturnLeftIcon, HomeIcon } from '@heroicons/react/24/solid';


const Error = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className='error-page'>
      <h1>Hmm. It seems like we've got a little problem.</h1>
      <p>{error.message || error.statusText}</p>
      <div>
        <button 
          onClick={() => {navigate(-1)}}
        >
          <ArrowUturnLeftIcon width={20}/>
          <span>Go back</span>
        </button>
        <Link
          to="/"
        >
          <HomeIcon width={20} />
          <span>Go home</span>
        </Link>
      </div>
    </div>
  )
}

export default Error
