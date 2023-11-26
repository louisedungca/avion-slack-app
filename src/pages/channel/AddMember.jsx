import { XCircleIcon } from '@heroicons/react/24/outline';
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import AsyncSelect from "react-select/async";
import { addMemberUrl, reactSelectStyles } from '../../utils';
import { useFetch } from '../../hooks';

function AddMember({ isOpen, onClose, onSubmit, users, channelData }) {
  // console.log('@AddMember - channelData', channelData);
  const { control, handleSubmit, formState: { isSubmitSuccessful }, reset } = useForm();
  const { fetchData: fetchAddMemberData, error: fetchAddMemberError, setError } = useFetch(addMemberUrl, { method: 'POST' });
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

    clearError();
  }, [isSubmitSuccessful, isOpen]);

  function clearError(){
    setError(null);
  };

  async function onSubmit(formData) {
    const newMemberID = formData.channelUsers.value;
    const body = {
      id: +channelData.id,
      member_id: +newMemberID,
    };

    try {
      const { response, result } = await fetchAddMemberData(body);
      console.log('Create Channel Response:', response);
      console.log('@Channel result:', result);

      if(result.error) {
        throw new Error (result.error || 'There was a problem in adding new member(s).');
      }

      setNewMember(users.find(item => item.id === +newMemberID));
      closeModal();
      toastDefault(`Cool! Say hi to your new member!`);
    } catch (error) {
      setError(fetchAddMemberError);
      console.error(fetchAddMemberError);
      toastError('Oops! There was a problem in adding the member. Please try again.');
    }
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-wrapper">
        <div className="modal-header">
          <h4 className='modal-title'>Add Member</h4>
          <button className="btn-close" onClick={() => {onClose(); clearError(); }}>
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
            rules={{ required: true }}
            render={({ field }) => (
              <AsyncSelect 
                {...field}
                placeholder='Enter email...'
                loadOptions={loadOptions} 
                styles={reactSelectStyles}
              />
            )}
          />

          {error &&  <small className='input-error' >You need to choose one user to add.</small>}
          <button className='btn-main' type="submit">Add</button>
        </form>        
      </div>
    </div>
  );
}

export default AddMember
