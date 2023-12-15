import palette from '../palette';

const primaryColor = palette.palette.default.primary.main;
const contrastTextColor = palette.palette.default.primary.contrastText;
const backgroundColorPaper = palette.palette.default.background.paper;
const textColorPrimary = palette.palette.default.text.primary;

const dialogStyles = {
    paper: {
      padding: '1rem',
      borderRadius: '0.5rem',
    },
    defaultProps: {
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            backgroundColor: primaryColor,
            color: contrastTextColor,
            padding: '1rem',
            fontSize: '1.5rem',
            fontWeight: 'bold',
          },
        },
      },
      MuiDialogContent: {
        styleOverrides: {
          root: {
            backgroundColor: backgroundColorPaper,
            color: textColorPrimary,
            padding: '1rem',
          },
        },
      },
      MuiDialogActions: {
        styleOverrides: {
          root: {
            backgroundColor: primaryColor,
            color: textColorPrimary,
            padding: '1rem',
            justifyContent: 'center',
          },
        },
      },
    },
};

export default dialogStyles;
