const fabStyles = {
    defaultProps: {
      MuiFab: {
        styleOverrides: {
          root: {
            backgroundColor: '#1a237e',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#0d133f',
            },
          },
          primary: {
            backgroundColor: '#1a237e',
            '&:hover': {
              backgroundColor: '#0d133f',
            },
          },
          secondary: {
            backgroundColor: '#1a237e',
            '&:hover': {
              backgroundColor: '#0d133f',
            },
          },
        },
        variants: [
          {
            props: { variant: 'extended' },
            style: {
              backgroundColor: '#1a237e',
              '&:hover': {
                backgroundColor: '#0d133f',
              },
            },
          },
        ],
      },
    },
  };
  
  export default fabStyles;
  