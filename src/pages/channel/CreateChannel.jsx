import { XCircleIcon } from '@heroicons/react/24/outline';
import { useForm, Controller } from 'react-hook-form';
import React, { useEffect } from 'react';
import AsyncSelect from "react-select/async";

import { createChannelUrl } from '../../utils';
import { useFetch } from '../../hooks';
import * as c from '../../components'

function CreateChannel({ isOpen, onClose, users }) {
  const { control, register, handleSubmit, formState: { errors, isSubmitSuccessful }, reset } = useForm();
  const { fetchData, error, setError } = useFetch(createChannelUrl, { method: 'POST' });

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
    if(isSubmitSuccessful && !error || !isOpen) {
      reset({ 
        channelName: '', 
        channelUsers: [],
      });
    }

  }, [isSubmitSuccessful, isOpen]);

  function clearError(){
    setError(null);
  };

  const onSubmit = async (formData) => {
    const { channelUsers, channelName } = formData; 
    const membersArray = channelUsers.map((member) => member.value);
    // console.log('@CreateChannel - formData:', formData);
    // console.log('channelName:', channelName);
    // console.log('channelUsers:', channelUsers);
    // console.log('membersArray:', membersArray);

    const body = {
      name: channelName,
      user_ids: membersArray,
    };

    try {
      const { response, result } = await fetchData(body);
      console.log('Create Channel Response:', response);
      console.log('@Channel result:', result);

      if (result.errors) {
        throw new Error(result.errors || 'There was a problem in creating a new channel.');
      }

      onClose();
    } catch (error) {
      setError(error);
      console.error('createChannelError:', error);
    }
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-wrapper">
        <div className="modal-header">
          <h4 className='modal-title'>Create New Channel</h4>
          <button className="btn-close"  onClick={() => { onClose(); clearError(); }}>
            <XCircleIcon />
          </button>
        </div>
      
        <form 
          onSubmit={handleSubmit(onSubmit)}
          className='modal-form'
        >
          {/* Channel name */}
          {c.newChannelInput.map(input => c.inputFieldTemplate(input, register, errors))}

          {/* Select users */}
          <p>Add members:</p>
          <Controller
            name="channelUsers"
            control={control}
            defaultValue={[]}
            rules={{ required: true }}
            render={({ field }) => (
              <AsyncSelect 
                {...field}
                placeholder='Enter email...'
                isMulti
                loadOptions={loadOptions} 
              />
            )}
          />
          {errors.channelUsers && <small className='input-error' >You need at least one member to create a channel.</small>}

          <div className="channel-guidelines">
            <small>Channel Guidelines:</small>
            <small>
              Participate as yourself. Remember to be kind and don't be rude. Try your best to not post anything that disrespects your fellow channel members.
            </small>
          </div>

          <button className='btn-main' type="submit">Create</button>

          {error && <small className='error-text'>{error.message}</small>}          
        </form>        
      </div>
    </div>
  );
}

export default CreateChannel
