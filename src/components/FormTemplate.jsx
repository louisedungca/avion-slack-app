import React, { useEffect, useRef, useState } from 'react';
import { Form } from 'react-router-dom';

function FormTemplate({ formInput, btnProps, onSubmit, resetForm=true }) {
  const [formData, setFormData] = useState({});
  const formRef = useRef();

  useEffect(() => {
    if (resetForm) {
      formReset();
    }
  }, [resetForm]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(formData);
    
    if (resetForm) {
      formReset();
    }
  };

  const formReset = () => {
    setFormData({});
    formRef.current.reset();
  };

  return (
    <Form
      method='post'
      className='form-content'
      autoComplete='on'
      ref={formRef}
      onSubmit={handleSubmit}      
    >
      {formInput.map((field) => (
          <input 
            key={field.name}
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            value={formData[field.name] || ''}
            required
            onChange={handleChange}
          />
        ))}

      <button className='btn-main' type="submit" {...btnProps}>{btnProps.text}</button>
    </Form>
  )
}

export default FormTemplate
