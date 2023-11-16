import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { inputFieldTemplate, signupInput } from '../../components/';
import { baseUrl, setLocalStorage } from '../../utils';
import { useAuth } from '../../hooks';

function SignUpPage() {
  const { register, handleSubmit, formState: { errors, isSubmitSuccessful }, reset } = useForm();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const url = `${baseUrl}/api/v1/auth/`;
  const { login } = useAuth();
  const navigate = useNavigate();

  const fetchData = async (formData) => {
    const { userEmail, userPassword, confirmPassword } = formData;
    const requestBody = {
      email: userEmail,
      password: userPassword,
      password_confirmation: confirmPassword,
    };

      // Log request
      console.log('Request URL:', url);
      console.log('Request Body:', requestBody);

    try {
      setLoading(true);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      // Log response
      console.log('Response Status:', response.status);
      // Log response headers
      const headersArray = Array.from(response.headers.entries());
      const headersObject = Object.fromEntries(headersArray);
      console.log('Response Headers:', headersObject);

      if (response.status === 404) {
        throw new Error('Page not found.');
      } else if (response.status === 422) {
        setError('Account exists. Choose another email to create a new account.');
      } else if (!response.ok) {
        const errorResponse = await response.json();
        console.error('Error Response:', errorResponse);
        throw new Error(errorResponse.message);
      } else {
        const responseBody = await response.json();
        setLocalStorage('headers', headersObject);
        console.log(responseBody)
  
        login(userData, token);
        console.log('Access-token:', token);
  
        navigate('/c');
      }      
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ userPassword: '', confirmPassword: '' });
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = (formData) => {
    fetchData(formData);
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

        <small className='error-text'>{error}</small>

        <Link to={'/login'} className='afterform-text'>
          <p>Already have an account? Sign in here.</p>
        </Link>
      </div>
    </section>
  );
}

export default SignUpPage;
