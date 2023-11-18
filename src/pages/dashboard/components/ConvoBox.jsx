import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useData } from '../../../hooks/useData';

function ConvoBox({ users, selectedUser }) {
  const { selectedUser: contextSelectedUser } = useData();
  const [convo, setConvo] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    const fetchedConvo = [
      { 
        sender: 'id',
        message: 'Hello!'
      },
      { 
        sender: 'selectedUser',
        message: 'Hi!'
      },
    ];
    setConvo(fetchedConvo);
  }, [selectedUser]);

  const onSubmit = ({ message }) => {
    setConversation([...conversation, { sender: 'me', message }]);

    reset();
  };

  return (
    <div className="message-box">
      <h2>Message Box</h2>
      <p>Selected User: {contextSelectedUser?.uid}</p>
      <div className="conversation">
        {convo.map((msg, index) => (
          <div key={index} className={msg.sender === 'me' ? 'my-message' : 'their-message'}>
            <strong>{msg.sender}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="message-input">
          <input
            type="text"
            placeholder="Type your message..."
            {...register('message', { required: 'Message is required' })}
          />
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  )
}

export default ConvoBox
