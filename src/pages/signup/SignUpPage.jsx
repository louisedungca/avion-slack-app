import React, { useEffect } from 'react';
import { Link, useNavigate, } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { inputFieldTemplate, signupInput } from '../../components/';
import { useAuth } from '../../hooks';

function SignUpPage() {
  const { register, handleSubmit, formState: { errors, isSubmitSuccessful }, reset } = useForm();
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(isSubmitSuccessful) {
      reset({ 
        userPassword: '', 
        confirmPassword: '',
      });
    }
  }, [isSubmitSuccessful]);

  async function onSubmit(formData) {
    try {
      await auth.signup(formData);
      navigate('/c/channels');
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <section className='signup-page'>
      <div className='page-leftbox'></div>
      <div className="page-rightbox">
        <h1>Hello, hello!</h1>

        <div className='form-wrapper'>
          <form onSubmit={handleSubmit(onSubmit)} className='form-content'>
            {signupInput.map((input) => inputFieldTemplate(input, register, errors))}

            <button type="submit" className='btn-main'>
              Create Account
            </button>
          </form>
        </div>

        <small className='error-text'>{auth.error}</small>

        <Link to={'/login'} className='afterform-text'>
          <p>Already have an account? Sign in here.</p>
        </Link>
      </div>
    </section>
  );
}

export default SignUpPage;
