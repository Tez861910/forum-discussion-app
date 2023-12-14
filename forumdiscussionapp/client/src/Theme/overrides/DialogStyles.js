import palette from '../palette';

const dialogStyles = {
    paper: {
      padding: '16px',
      borderRadius: '8px',
    },
    defaultProps: {
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            backgroundColor: palette.palette.primary.main,
            color: palette.palette.primary.contrastText,
            padding: '16px',
            fontSize: '1.5rem',
            fontWeight: 'bold',
          },
        },
      },
      MuiDialogContent: {
        styleOverrides: {
          root: {
            backgroundColor: palette.palette.background.paper,
            color: palette.palette.text.primary,
            padding: '16px',
          },
        },
      },
      MuiDialogActions: {
        styleOverrides: {
          root: {
            backgroundColor: palette.palette.primary.main,
            color: palette.palette.text.primary,
            padding: '16px',
            justifyContent: 'center',
          },
        },
      },
    },
};

export default dialogStyles;
