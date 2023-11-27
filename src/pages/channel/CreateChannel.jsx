import { XCircleIcon } from '@heroicons/react/24/outline';
import { useForm, Controller } from 'react-hook-form';
import React, { useEffect } from 'react';
import AsyncSelect from "react-select/async";

import { createChannelUrl, reactSelectStyles, toastDefault, toastError } from '../../utils';
import { useFetch } from '../../hooks';
import * as c from '../../components'
import { useNavigate } from 'react-router-dom';

function CreateChannel({ isOpen, onClose, users, fetchChannels }) {
  const navigate = useNavigate();
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

  async function onSubmit(formData) {
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
      fetchChannels();
      toastDefault(`Channel ${result.data.name} created!`);
      navigate(`/c/channels/${result.data.id}`);
    } catch (error) {
      setError(error);
      console.error('createChannelError:', error);
      toastError('Oops! There was a problem creating the channel. Please try again.');
    }
  };

  // console.log('@CreateChannel - fetchChannels:', fetchChannels); 

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
          {error && <small className='input-error'>{error.message}</small>}    

          {/* Select users */}
          <p>Add members:</p>
          <Controller
            name="channelUsers"
            control={control}
            defaultValue={[]}
            rules={{ required: 'You need at least one member to create a channel.' }}
            render={({ field, fieldState }) => (
              <>
                <AsyncSelect 
                  {...field}
                  placeholder='Enter email...'
                  isMulti
                  loadOptions={loadOptions} 
                  styles={reactSelectStyles}
                />
                {fieldState?.error?.message && (
                  <small className='input-error'>{fieldState.error.message}</small>
                )}
              </>
            )}
          />
          <div className="channel-guidelines">
            <small>Channel Guidelines:</small>
            <small>
              Participate as yourself. Remember to be kind and don't be rude. Try your best to not post anything that disrespects your fellow channel members.
            </small>
          </div>

          <button className='btn-main' type="submit">Create</button>      
        </form>        
      </div>
    </div>
  );
}

export default CreateChannel
