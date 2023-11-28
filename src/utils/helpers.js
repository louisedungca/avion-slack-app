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

// errors
export function errors(error) {
  let errorMessage = '';

  if (error) {
    console.error('Error Status:', error.status);
    console.error('Error Message:', error.message);

    if (error.status === 404) {
      errorMessage = "This page doesn't exist.";
    } else if (error.status === 401) {
      errorMessage = "Invalid username or password.";
    } else if (error.status === 422) {
      errorMessage = "Account exists. Choose another email to create a new account.";
    } else if (error.status === 503) {
      errorMessage = "Looks like our system is down.";
    } else if (error.status === 418) {
      errorMessage = "🫖";
    }
  } else {
    errorMessage = error.message || error.statusText || "Something went wrong";
  }
};
