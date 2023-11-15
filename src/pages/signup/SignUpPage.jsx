import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { inputFieldTemplate, signupInput } from '../../components/';
import { baseUrl } from '../../utils';

function SignUpPage() {
  const { register, handleSubmit, formState: { errors, isSubmitSuccessful }, reset} = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if(isSubmitSuccessful) {
      reset({ 
        userPassword: '', 
        confirmPassword: '',
      });
    }
  }, [isSubmitSuccessful])

  const onSubmit = async (formData) => {
    try {
      setLoading(true);
      const url = `${baseUrl}/api/v1/auth/`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.userEmail,
          password: formData.userPassword,
          password_confirmation: formData.confirmPassword,
        }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error('Error Response:', errorResponse);

        if (response.status === 404) {
          throw new Error('Page not found.');
        }
        if (response.status === 422) {
          setError('Account exists. Choose another email to create a new account.');
        }

        throw new Error(errorResponse.message);
      }

      const data = await response.json();
      navigate('/login');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='signup-page'>
      <div className='page-leftbox'></div>    
      <div className="page-rightbox">
        <h1>Hello, hello!</h1>

        <div className='form-wrapper'>
          <form onSubmit={handleSubmit(onSubmit)} className='form-content'>
              
            {signupInput.map(input => inputFieldTemplate(input, register, errors))}

            <button
            type="submit"
            className='btn-main'
            >
              Create Account
            </button>
          </form>
        </div>

        <small className='error-text'>{error}</small>

        <Link to={'/login'} className='afterform-text'>
          <p>Already have an account? Sign in here.</p>
        </Link> 
      </div>  
    </section>
  )
}

export default SignUpPage
