// timestamp
export function formatTimestamp(timestamp) {
  const messageDate = new Date(timestamp);
  const today = new Date();
  const time = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  };

  if (
    messageDate.getDate() === today.getDate() &&
    messageDate.getMonth() === today.getMonth() &&
    messageDate.getFullYear() === today.getFullYear()
  ) {

    return (`Today ${messageDate.toLocaleString('en-US', time)}`);
  } else if ( 
    messageDate.getDate() === today.getDate() - 1 &&
    messageDate.getMonth() === today.getMonth() &&
    messageDate.getFullYear() === today.getFullYear()
  ) {

    return (`Yesterday ${messageDate.toLocaleString('en-US', time)}`);
  } else {
    const dateFormatOptions = {
      month: 'numeric',
      day: 'numeric',
      year: '2-digit',
    };

    return (`${messageDate.toLocaleString('en-US', dateFormatOptions)} ${messageDate.toLocaleString('en-US', time)}`);
  }
}

/* Usage:
<div className="timestamp">
  {formatTimestamp(message.created_at)}
</div>    
*/

