const drawerStyles = {
    paper: {
      width: '240px',
      backgroundColor: '#311b92',
    },
    defaultProps: {
      MuiList: {
        styleOverrides: {
          root: {
            width: '100%',
            maxWidth: '360px',
            backgroundColor: '#311b92',
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            color: '#ffffff',
          },
          button: {
            '&:hover': {
              backgroundColor: '#1a237e',
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
      MuiDivider: {
        styleOverrides: {
          root: {
            backgroundColor: '#1a237e',
          },
        },
      },
    },
  };
  
  export default drawerStyles;
  