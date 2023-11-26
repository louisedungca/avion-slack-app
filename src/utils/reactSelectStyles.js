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
  menuList: (provided, state) => ({
    ...provided,
    backgroundColor: '#fffff0',
    border: '2px dotted #58094F',
    borderRadius: '0.8rem',

    '::-webkit-scrollbar': {
      width: '0.3rem',
      height: '0.3rem',
    },
  
    '::-webkit-scrollbar-track': {
      backgroundColor: '#58094F',
      borderRadius: '0.8rem',
    },
  
    '::-webkit-scrollbar-thumb': {
      backgroundColor: '#F3AA20',
      borderRadius: '0.3rem',
    },
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