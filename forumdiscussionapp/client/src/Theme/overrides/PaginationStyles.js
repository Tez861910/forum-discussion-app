const paginationStyles = {
    root: {
      display: 'flex',
      justifyContent: 'center',
      padding: '10px 0',
    },
    ul: {
      justifyContent: 'center',
    },
    defaultProps: {
      MuiPaginationItem: {
        styleOverrides: {
          root: {
            color: '#1a237e',
          },
          page: {
            '&.Mui-selected': {
              backgroundColor: '#1a237e',
              color: '#ffffff',
              '&:hover': {
                backgroundColor: '#0d47a1',
              },
            },
          },
          previous: {
            color: '#1a237e',
          },
          next: {
            color: '#1a237e',
          },
          first: {
            color: '#1a237e',
          },
          last: {
            color: '#1a237e',
          },
        },
      },
    },
  };
  
  export default paginationStyles;
  