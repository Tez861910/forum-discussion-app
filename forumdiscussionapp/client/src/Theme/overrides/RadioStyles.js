const radioStyles = {
    defaultProps: {
      MuiRadio: {
        styleOverrides: {
          root: {
            color: '#1a237e',
            '&$checked': {
              color: '#1a237e',
            },
          },
          colorSecondary: {
            '&$checked': {
              color: '#1a237e',
            },
            '&$disabled': {
              color: '#bdbdbd',
            },
          },
          colorPrimary: {
            '&$checked': {
              color: '#1a237e',
            },
            '&$disabled': {
              color: '#bdbdbd',
            },
          },
        },
      },
      MuiFormControlLabel: {
        styleOverrides: {
          root: {
            color: '#1a237e',
          },
          label: {
            color: '#1a237e',
          },
          disabled: {
            color: '#bdbdbd',
          },
        },
      },
      MuiRadioGroup: {
        styleOverrides: {
          root: {
            flexDirection: 'row',
          },
        },
      },
    },
  };
  
  export default radioStyles;
  