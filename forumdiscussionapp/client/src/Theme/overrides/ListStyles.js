const listStyles = {
    root: {
      width: '100%',
      backgroundColor: '#311b92',
      color: '#ffffff',
    },
    defaultProps: {
      MuiListItem: {
        styleOverrides: {
          root: {
            '&.Mui-selected': {
              backgroundColor: '#1a237e',
              '&:hover': {
                backgroundColor: '#0d47a1',
              },
            },
            '&:hover': {
              backgroundColor: '#eeeeee',
            },
          },
          button: {
            '&:hover': {
              backgroundColor: '#eeeeee',
            },
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            color: '#ffffff',
          },
        },
      },
      MuiListItemText: {
        styleOverrides: {
          root: {
            color: '#ffffff',
          },
        },
      },
      MuiListSubheader: {
        styleOverrides: {
          root: {
            color: '#ffffff',
            backgroundColor: '#1a237e',
          },
        },
      },
    },
  };
  
  export default listStyles;
  