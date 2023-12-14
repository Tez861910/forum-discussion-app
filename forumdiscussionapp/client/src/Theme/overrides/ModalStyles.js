import palette from '../palette';

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
            backgroundColor: palette.palette.background.default,
          },
        },
      },
      MuiBackdrop: {
        styleOverrides: {
          root: {
            backgroundColor: palette.palette.background.default, 
            transition: 'opacity 300ms ease-out', 
          },
        },
      },
    },
};

export default modalStyles;
