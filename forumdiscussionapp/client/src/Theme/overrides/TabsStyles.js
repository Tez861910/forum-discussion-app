const tabsStyles = {
    defaultProps: {
      MuiTabs: {
        styleOverrides: {
          root: {
            backgroundColor: '#e8eaf6', 
            minHeight: 48, 
          },
          indicator: {
            backgroundColor: '#3f51b5', 
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            minWidth: 72, 
            '&:hover': {
              color: '#1a237e', 
              opacity: 1,
            },
            '&$selected': {
              color: '#3949ab',
            },
            '&:focus': {
              color: '#3949ab',
            },
          },
        },
      },
    },
  };
  
  export default tabsStyles;
  