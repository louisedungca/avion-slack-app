import { XCircleIcon } from '@heroicons/react/24/outline';
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import AsyncSelect from "react-select/async";
import { reactSelectStyles } from '../../utils';

function AddMember({ isOpen, onClose, onSubmit, users, channelData}) {
  // console.log('@AddMember - channelData', channelData);
  const { control, handleSubmit, formState: { isSubmitSuccessful }, reset } = useForm();
  const membersID = channelData.channel_members.map(member => member.user_id);
  const options = users
    .filter(user => !membersID.includes(user.id))
    .map((user) => ({
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
    if(isSubmitSuccessful || !isOpen) {
      reset({ 
        channelName: '', 
        channelUsers: [],
      });
    }
  }, [isSubmitSuccessful, isOpen]);

  function handleClick() {
    onClose(); 
    reset({
      channelUsers: [],
    });
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-wrapper">
        <div className="modal-header">
          <h4 className='modal-title'>Add Member</h4>
          <button className="btn-close" onClick={handleClick}>
            <XCircleIcon />
          </button>
        </div>
      
        <form 
          onSubmit={handleSubmit(onSubmit)}
          className='modal-form'
        >
          <Controller
            name="channelUsers"
            control={control}
            defaultValue={[]}
            rules={{ required: 'You need to choose one user to add.' }}
            render={({ field, fieldState }) => (
              <>
                <AsyncSelect 
                  {...field}
                  placeholder='Enter email...'
                  loadOptions={loadOptions} 
                  styles={reactSelectStyles}
                />
                {fieldState?.error?.message && (
                  <small className='input-error'>{fieldState.error.message}</small>
                )}
              </>
            )}
          />
          <button className='btn-main' type="submit">Add</button>
        </form>        
      </div>
    </div>
  );
}

export default AddMember
