import React from 'react';
import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router-dom';
import { ArrowUturnLeftIcon, HomeIcon } from '@heroicons/react/24/solid';

const Error = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  
  let errorMessage = '';

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      errorMessage = "This page doesn't exist.";
    } else if (error.status === 401) {
      errorMessage = "You aren't allowed on this page.";
    } else if (error.status === 503) {
      errorMessage = "Looks like our system is down.";
    } else if (error.status === 418) {
      errorMessage = "🫖";
    }
  } else {
    errorMessage = error.message || error.statusText || "Something went wrong";
  }

  return (
    <div className='error-page'>
      <h1>Hmm, there is quite a problem!</h1>
      <h2>{errorMessage}</h2>

      <div className='btns-wrapper'>
        <button 
          onClick={() => {navigate(-1)}}
        >
          <ArrowUturnLeftIcon width={20}/>
        </button>

        <button 
          onClick={() => {navigate('/c/channels')}}
        >
          <HomeIcon width={20}/>
        </button>
      </div>
    </div>
  );
};

export default Error;
