import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { inputFieldTemplate, loginInput } from '../../components';
import { baseUrl, setLocalStorage } from '../../utils';
import { useAuth } from '../../hooks';


function LoginPage() {
  const { register, handleSubmit, formState: { errors, isSubmitSuccessful }, reset } = useForm();
  const url = `${baseUrl}/api/v1/auth/sign_in`; 
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const fetchData = async (formData) => {
    const { userEmail, userPassword } = formData; 
    const requestBody = {
      email: userEmail,
      password: userPassword,
    };

    // Log request 
    console.log('Request URL:', url);
    console.log('Request Body:', requestBody);

    try {   
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
        throw new Error("This page doesn't exist.");
      } else if (response.status === 401) {
        setError('Invalid username or password.');
      } else if (!response.ok) {      
        const errorResponse = await response.json(); 
        throw new Error(errorResponse.message);
      } else {
        const userData = await response.json();
        const token = headersObject['access-token'];
        console.log('Response Body:', userData);  
        setLocalStorage('headers', headersObject);
        
        login(userData, token);
        console.log('Access-token:', token);
        navigate('/c');     
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if(isSubmitSuccessful) {
      reset({ 
        userPassword: '', 
      });
    }
  }, [isSubmitSuccessful]);

  const onSubmit = (formData) => {
    fetchData(formData);
  };

  return (
    <section className='login-page'>
      <div className='page-leftbox'>
        <h1>Glad you're back!</h1>

        <div className='form-wrapper'>
          <form onSubmit={handleSubmit(onSubmit)} className='form-content'>
            
            {loginInput.map(input => inputFieldTemplate(input, register, errors))}

            <button
             type="submit"
             className='btn-main'
            >
              Login
            </button>
          </form>
        </div>

        <small className='error-text'>{error}</small>

        <Link to={'/signup'} className='afterform-text'>
          <p>No account yet? Sign up here.</p>
        </Link>
      </div>
      <div className="page-rightbox"></div>
    </section>
  );
}

export default LoginPage;
