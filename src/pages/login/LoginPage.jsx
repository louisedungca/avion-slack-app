import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { baseUrl } from '../../utils/';
import c from '../../components/';


function LoginPage() {
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const formInput = [
    { type: 'email', name: 'userEmail', placeholder: 'Email' },
    { type: 'password', name: 'userPassword', placeholder: 'Password' },
  ];

  const btnProps = {
    name: 'formAction',
    value: 'loginUser',
    text: 'Login',
  };

  async function handleLogin(formData) {
    const { userEmail, userPassword } = formData;
    console.log('formData:', formData);

    try {
      const url = `${baseUrl}/api/v1/auth/sign_in`;

      console.log('Fetch Request:', {
        method: 'POST',
        url: url,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          password: userPassword,
        }),
      });

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          password: userPassword,
        }),
      });

      console.log('Fetch Response:', {
        status: response.status,
        statusText: response.statusText,
      });

      // log headers object
      response.headers.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      if (!response.ok) {
        const errorResponse = await response.json(); 
        console.error('Error Response:', errorResponse); 

        if (response.status === 404) {
          throw new Error('Page not found.');
        }
        if (response.status === 401) {
          setLoginError('Invalid username or password.');
        }

        throw new Error(errorResponse.message); 
      }

      const data = await response.json();
      navigate('/c');

    } catch (error) {
      console.error(error);
    } 

  }

  return (
    <section className='login-page'>
      <div className='page-leftbox'>
        <h1>Glad you're back!</h1>

        <div className='form-wrapper'>
          <c.FormTemplate 
            formInput={formInput} 
            btnProps={btnProps}
            resetForm = {false}
            onSubmit={handleLogin}
          />
        </div>

        <small className='error-text'>{loginError}</small>
        
        <Link to={'/signup'} className='afterform-text'>
          <p>No account yet? Sign up here.</p>
        </Link>        
      </div>    
      <div className="page-rightbox"></div>  
    </section>
  );
}

export default LoginPage;
