const accordionStyles = {
    root: {
      margin: '16px 0',
    },
    rounded: {
      borderRadius: '4px',
    },
    expanded: {
      margin: '16px 0',
    },
    gutters: {
      padding: '0 16px',
    },
    defaultProps: {
      MuiAccordionSummary: {
        styleOverrides: {
          root: {
            backgroundColor: '#1a237e',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#0d47a1',
            },
          },
        },
      },
      MuiAccordionDetails: {
        styleOverrides: {
          root: {
            backgroundColor: '#311b92',
            color: '#ffffff',
          },
        },
      },
    },
  };
  
  export default accordionStyles;
  