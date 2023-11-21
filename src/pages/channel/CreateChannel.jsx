import React, { useEffect } from 'react';
import AsyncSelect from "react-select/async";
import { useForm, Controller } from 'react-hook-form';
import { inputFieldTemplate, newChannelInput } from '../../components';

function CreateChannel({ isOpen, onClose, onSubmit, users }) {
  const { control, register, handleSubmit, formState: { errors, isSubmitSuccessful }, reset } = useForm();

  const options = users.map((user) => ({
    value: user.id,
    label: user.uid,
  }));

  function loadOptions(searchValue, callback) {
    const filteredOptions = options.filter((user) =>
        user.label.toLowerCase().includes(searchValue.toLowerCase())
      );
      setTimeout(() => {     
        callback(filteredOptions);
      }, 800);
  };

  useEffect(() => {
    if(isSubmitSuccessful) {
      reset({ 
        channelName: '', 
      });
    }

  }, [isSubmitSuccessful]);

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className="modal-content">
        <h4 className='modal-title'>Create New Channel</h4>

        <form 
          onSubmit={handleSubmit(onSubmit)}
          className='modal-form'
        >
          {/* Channel name */}
          {newChannelInput.map(input => inputFieldTemplate(input, register, errors))}

          {/* Select users */}
          <p>Add members:</p>
          <Controller
            name="channelUsers"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <AsyncSelect 
                {...field}
                placeholder='Enter email...'
                isMulti
                loadOptions={loadOptions} 
                // onChange={handleSelectedUser}
              />
            )}
          />

          <div className="channel-guidelines">
            <small>Channel Guidelines:</small>
            <small>Participate as yourself and don't post anything that disrespects your fellow channel members. Be kind and don't be rude or cruel.</small>
          </div>

          <button className='btn-main' type="submit">Create</button>
        </form>        
      </div>
    </div>
  );
}

export default CreateChannel
