import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { inputFieldTemplate, loginInput } from '../../components';
import { baseUrl } from '../../utils';


function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    const { userEmail, userPassword } = formData;

    try {
      const url = `${baseUrl}/api/v1/auth/sign_in`;

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
