// timestamp
export function formatTimestamp(timestamp) {
  const messageDate = new Date(timestamp);
  const today = new Date();
  
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  };

  if (
    messageDate.getDate() === today.getDate() &&
    messageDate.getMonth() === today.getMonth() &&
    messageDate.getFullYear() === today.getFullYear()
  ) {
    return 'Today ' + messageDate.toLocaleString('en-US', options);
  } else {
    const dayOptions = {
      weekday: 'long',
      ...options,
    };
    return messageDate.toLocaleString('en-US', dayOptions);
  }
}


/* Usage:
const [selectedTimestamp, setSelectedTimestamp] = useState(null);

const handleTimestampClick = (timestamp) => {
  setSelectedTimestamp(timestamp);
}

<div className="timestamp">
  {selectedTimestamp === message.created_at && formatTimestamp(message.created_at)}
</div>    
*/