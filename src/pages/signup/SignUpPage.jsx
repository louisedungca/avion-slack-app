import React from 'react';
import c from '../../components/';

function SignUpPage() {
  const formInput = [
    { type: 'text', name: 'firstName', placeholder: 'First Name' },
    { type: 'text', name: 'lastName', placeholder: 'Last Name' },
    { type: 'email', name: 'userEmail', placeholder: 'Email' },
    { type: 'password', name: 'userPassword', placeholder: 'Password' },
    { type: 'password', name: 'confirmPassword', placeholder: 'Confirm Password' },
  ];

  const btnProps = {
    name: 'formAction',
    value: 'createAccount',
    text: 'Sign Up',
  };

  const handleRegistration = (formData) => {
    console.log('Registered data:', formData);
  };

  return (
    <section className='signup-page'>
      <div className='page-leftbox'></div>    
      <div className="page-rightbox">
        <h1>Hello, hello!</h1>

        <div className='form-wrapper'>
          <c.FormTemplate 
            formInput={formInput} 
            btnProps={btnProps}
            onSubmit={handleRegistration}
          />
        </div>

        <div className='afterform-text'>          
          <p>Already have an account? Sign in.</p>
          <p>Forgot password?</p>
        </div>
      </div>  
    </section>
  )
}

export default SignUpPage
