const menuStyles = {
    defaultProps: {
      MuiMenu: {
        styleOverrides: {
          paper: {
            backgroundColor: '#f5f5f5', 
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            '&:hover': {
              backgroundColor: '#e0e0e0', 
            },
            '&$selected': {
              backgroundColor: '#bdbdbd',
            },
          },
        },
      },
    },
  };
  
  export default menuStyles;
  