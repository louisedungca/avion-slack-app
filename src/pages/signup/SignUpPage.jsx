import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { useFetchAuth } from '../../hooks';
import { signupUrl } from '../../utils';
import * as c from '../../components';

function SignUpPage() {
  const { register, handleSubmit, formState: { errors, isSubmitSuccessful }, reset } = useForm();
  const { handleRequest, error, isLoading } = useFetchAuth();

  useEffect(() => {
    if(isSubmitSuccessful) {
      reset({ 
        userPassword: '', 
        confirmPassword: '',
      });
    }
  }, [isSubmitSuccessful]);

  async function onSubmit(formData) {
    const { userEmail, userPassword, confirmPassword } = formData;    

    try {      
      await handleRequest(signupUrl, {
        method: 'POST',
        body: {
          email: userEmail,
          password: userPassword,
          password_confirmation: confirmPassword,
        }
      });

    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <section className='signup-page'>
      <c.WelcomeNavbar /> 
      <div className='page-leftbox'></div>
      <div className="page-rightbox">
        <h1>Bring people together.</h1>

        <div className='form-wrapper'>
          <form onSubmit={handleSubmit(onSubmit)} className='form-content'>
            {c.signupInput.map((input) => c.inputFieldTemplate(input, register, errors))}

            <button 
              type="submit" 
              className='btn-main'
              disabled={isLoading}
              style={{ opacity: isLoading ? 0.65 : 1 }}
            >
              Create Account
            </button>
          </form>
        </div>

        <small className='error-text'>{error}</small>

        <Link to={'/'} className='afterform-text'>
          <p>Already have an account? Sign in here.</p>
        </Link>
      </div>
    </section>
  );
}

export default SignUpPage;
