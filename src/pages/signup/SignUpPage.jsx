import React, { useEffect } from 'react';
import { inputFieldTemplate, signupInput } from '../../components/';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function SignUpPage() {
  const { register, handleSubmit, formState: { errors, isSubmitSuccessful }, reset} = useForm();

  const handleRegistration = (formData) => {
    console.log('Registered data:', formData);
  };

  useEffect(() => {
    if(isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful])

  return (
    <section className='signup-page'>
      <div className='page-leftbox'></div>    
      <div className="page-rightbox">
        <h1>Hello, hello!</h1>

        <div className='form-wrapper'>
          <form onSubmit={handleSubmit(handleRegistration)} className='form-content'>
              
            {signupInput.map(input => inputFieldTemplate(input, register, errors))}

            <button
            type="submit"
            className='btn-main'
            >
              Create Account
            </button>
          </form>
        </div>

        <small className='error-text'>DEMO ERROR</small>

        <Link to={'/login'} className='afterform-text'>
          <p>Already have an account? Sign in here.</p>
        </Link> 
      </div>  
    </section>
  )
}

export default SignUpPage
