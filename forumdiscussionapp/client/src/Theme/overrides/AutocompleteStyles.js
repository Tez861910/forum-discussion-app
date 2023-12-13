const autocompleteStyles = {
    root: {
        '& .MuiOutlinedInput-root': {
          '&.Mui-focused fieldset': {
            borderColor: '#1a237e',
          },
        },
      },
      inputRoot: {
        '&.MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#ff6f00',
          },
          '&:hover fieldset': {
            borderColor: '#1a237e',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#1a237e',
          },
        },
      },
      listbox: {
        backgroundColor: '#311b92',
        color: '#ffffff',
      },
      option: {
        '&[data-focus="true"]': {
          backgroundColor: '#1a237e',
        },
        '&[aria-selected="true"]': {
          backgroundColor: '#0d47a1',
        },
      },
      groupLabel: {
        backgroundColor: '#311b92',
        color: '#ffffff',
      },
      popupIndicator: {
        color: '#1a237e',
      },
      clearIndicator: {
        color: '#ff6f00',
      },
};

export default autocompleteStyles;