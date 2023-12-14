const stepperStyles = {
    defaultProps: {
      MuiStepper: {
        styleOverrides: {
          root: {
            backgroundColor: 'transparent', 
            padding: '24px', 
          },
        },
      },
      MuiStep: {
        styleOverrides: {
          root: {
            padding: '8px',
          border: '1px solid #1a237e',
          borderRadius: '4px',
          margin: '4px',
          '&$completed': {
            borderColor: '#9fa8da',
          },
          '&$active': {
            borderColor: '#3f51b5',
            backgroundColor: '#e8eaf6',
          },
        },
      },
    },
      MuiStepLabel: {
        styleOverrides: {
          label: {
            color: '#1a237e', 
            '&$active': {
              color: '#3f51b5', 
            },
            '&$completed': {
              color: '#9fa8da', 
            },
          },
        },
      },
      MuiStepConnector: {
        styleOverrides: {
          line: {
            borderColor: '#1a237e', 
          },
        },
      },
    },
  };
  
  export default stepperStyles;
  