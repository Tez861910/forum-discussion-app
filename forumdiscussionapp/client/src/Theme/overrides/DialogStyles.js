const dialogStyles = {
    paper: {
      padding: '16px',
      borderRadius: '8px',
    },
    defaultProps: {
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            backgroundColor: '#1a237e',
            color: '#ffffff',
            padding: '16px',
            fontSize: '1.5rem',
            fontWeight: 'bold',
          },
        },
      },
      MuiDialogContent: {
        styleOverrides: {
          root: {
            backgroundColor: '#311b92',
            color: '#ffffff',
            padding: '16px',
          },
        },
      },
      MuiDialogActions: {
        styleOverrides: {
          root: {
            backgroundColor: '#1a237e',
            color: '#ffffff',
            padding: '16px',
            justifyContent: 'center',
          },
        },
      },
    },
  };
  
  export default dialogStyles;
  