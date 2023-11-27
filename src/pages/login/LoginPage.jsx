import React, { useEffect } from 'react';
import { Link, useNavigate, } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { WelcomeNavbar, inputFieldTemplate, loginInput } from '../../components';
import { useAuth } from '../../hooks';

function LoginPage() {
  const { register, handleSubmit, formState: { errors, isSubmitSuccessful }, reset } = useForm();
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(isSubmitSuccessful) {
      reset({ 
        userPassword: '', 
      });
    }
  }, [isSubmitSuccessful]);

  async function onSubmit(formData) {
    try {
      await auth.login(formData);
      navigate('/c/channels');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <section className='login-page'>
      <WelcomeNavbar />
      <div className='page-leftbox'>
        <h1>Say hello to your people now.</h1>

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

        <small className='error-text'>{auth.error}</small>

        <Link to={'/signup'} className='afterform-text'>
          <p>No account yet? Sign up here.</p>
        </Link>
      </div>
      <div className="page-rightbox"></div>
    </section>
  );
}

export default LoginPage;
