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

// react-select styles
export const reactSelectStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: '#fffff0',
    border: '2px dotted #58094F',
    '&:hover': {
      border: '2px solid #F3AA20', 
    },
    '&:focus': {
      outline: 'none',
    },
    cursor: 'pointer',
    borderRadius: '0.8rem',
    fontSize: 'clamp(0.7rem, 0.6077rem + 0.3077vw, 1rem)',
    letterSpacing: '0.12rem',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#f9e7f3' : 'white', 
    color: state.isFocused ? '#58094F' : 'inherit', 
    cursor: 'pointer',
    borderRadius: '0.85rem',
    fontSize: 'clamp(0.7rem, 0.6077rem + 0.3077vw, 1rem)',
  }),  
  menu: (provided, state) => ({
    ...provided,
    backgroundColor: '#fffff0',
    border: '2px dotted #58094F',
    borderRadius: '0.8rem',
  }),
  noOptionsMessage: (provided, state) => ({
    ...provided,
    fontSize: 'clamp(0.7rem, 0.6077rem + 0.3077vw, 1rem)',
    letterSpacing: '0.12rem',
  }),
}

/* Usage: (as props)
styles={reactSelectStyles}
*/