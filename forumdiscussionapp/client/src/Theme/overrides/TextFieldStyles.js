const textFieldStyles = {
    root: {
      margin: '8px 0',
    },
    defaultProps: {
      MuiInput: {
        styleOverrides: {
          root: {
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
            padding: '10px',
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: '#1a237e',
            fontWeight: 'bold',
          },
        },
      },
      MuiInputAdornment: {
        styleOverrides: {
          root: {
            color: '#1a237e',
          },
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            color: '#ff6f00',
          },
        },
      },
    },
  };
  
  export default textFieldStyles;
  