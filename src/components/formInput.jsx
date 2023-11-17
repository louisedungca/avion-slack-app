// input field
export const inputFieldTemplate = (input, register, errors) => (
  <div key={input.name}>
    <input
      className='form-input'
      type={input.type}
      placeholder={input.placeholder}
      {...register(input.name, {
        ...input.validation,
      })} 
    />
    {errors[input.name] && <h6 className='input-error'>{errors[input.name].message}</h6>}
  </div>
);

// login form inputs
export const loginInput = [
  { 
    type: 'email', 
    name: 'userEmail', 
    placeholder: 'Email', 
    validation: { 
      required: 'This field is required',
      pattern: {
        value: /^\S+@\S+\.\S+$/, 
        message: 'Email format must be email@email.com' 
      }
    } 
  },
  { 
    type: 'password', 
    name: 'userPassword',
    placeholder: 'Password', 
    validation: { 
      required: 'This field is required',
      minLength: {
        value: 6, 
        message: 'Password must be at least 6 characters' 
      }
    } 
  },
];

// signup form inputs
export const signupInput = [
  // { 
  //   type: 'text', 
  //   name: 'firstName', 
  //   placeholder: 'First Name', 
  //   validation: { 
  //     pattern: {
  //       value: /^[A-Za-z]+$/,
  //       message: 'First name must contain only letters',
  //     }
  //   }
  // },
  // { 
  //   type: 'text', 
  //   name: 'lastName', 
  //   placeholder: 'Last Name', 
  //   validation: { 
  //     pattern: {
  //       value: /^[A-Za-z]+$/,
  //       message: 'Last name must contain only letters',
  //     }
  //   }
  // },
  { 
    type: 'email', 
    name: 'userEmail', 
    placeholder: 'Email', 
    validation: { 
      required: 'This field is required',
      pattern: {
        value: /^\S+@\S+\.\S+$/, 
        message: 'Email format must be email@email.com' 
      }
    } 
  },
  { 
    type: 'password', 
    name: 'userPassword',
    placeholder: 'Password', 
    validation: { 
      required: 'This field is required',
      minLength: {
        value: 6, 
        message: 'Password must be at least 6 characters' 
      }
    } 
  },
  { 
    type: 'password', 
    name: 'confirmPassword',
    placeholder: 'Confirm Password', 
    validation: { 
      required: 'This field is required',
      validate: (value, { userPassword }) => {
        return value === userPassword || 'Passwords do not match';
      }
    } 
  },
];


