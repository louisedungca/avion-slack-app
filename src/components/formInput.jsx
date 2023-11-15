// login form inputs
export const loginInput = [
  { 
    type: 'email', 
    name: 'userEmail', 
    placeholder: 'Email', 
    validation: { 
      pattern: {
        value: /^\S+@\S+$/i, 
        message: 'Email format must be email@email.com' 
      }
    } 
  },
  { 
    type: 'password', 
    name: 'userPassword',
    placeholder: 'Password', 
    validation: { 
      minLength: {
        value: 6, 
        message: 'Password must be at least 6 characters' 
      }
    } 
  },
];

// signup form inputs

// input field
export const inputFieldTemplate = (input, register, errors) => (
  <div key={input.name}>
    <input
      className='form-input'
      type={input.type}
      placeholder={input.placeholder}
      {...register(input.name, {
        required: `${input.placeholder} is required`,
        ...input.validation,
      })}
    />
    {errors[input.name] && <h6 className='input-error'>{errors[input.name].message}</h6>}
  </div>
);
