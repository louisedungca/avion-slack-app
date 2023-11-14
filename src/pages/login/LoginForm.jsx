import React from 'react';
import { Form } from 'react-router-dom';

function LoginForm() {
  return (
    <div className='login-form-wrapper'>
      <Form method='post' className='form-content'>
        <input 
          type="text"
          name='userEmail'
          placeholder='Email'
        />

        <input 
          type='password'
          name='userEmail'
          placeholder='Password'
        />

        <button>
          LOGIN
        </button>

      </Form>
    </div>
  )
}

export default LoginForm
