import palette from '../palette';

const stackStyles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  defaultProps: {
    MuiBox: {
      styleOverrides: {
        root: {
          padding: '16px',
          borderRadius: '8px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: '16px',
          backgroundColor: palette.palette.primary.main,
          color: palette.palette.text.primary,
        },
      },
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
      },
    },
  },
};

export default stackStyles;
