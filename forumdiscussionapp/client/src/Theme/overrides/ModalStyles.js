const modalStyles = {
    defaultProps: {
      MuiModal: {
        styleOverrides: {
          root: {
            position: 'fixed',
            zIndex: 1300,
            right: 0,
            bottom: 0,
            top: 0,
            left: 0,
            overflow: 'auto',
            outline: 0,
          },
          backdrop: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
      MuiBackdrop: {
        styleOverrides: {
          root: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
            transition: 'opacity 300ms ease-out', 
          },
        },
      },
    },
  };
  
  export default modalStyles;
  