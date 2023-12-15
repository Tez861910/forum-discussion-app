import palette from '../palette';

const primaryColor = palette.palette.default.primary.main;
const contrastTextColor = palette.palette.default.primary.contrastText;
const backgroundColorPaper = palette.palette.default.background.paper;
const textColorPrimary = palette.palette.default.text.primary;

const cardStyles = {
    root: {
      padding: '1rem',
      borderRadius: '0.5rem',
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    },
    defaultProps: {
      MuiCardHeader: {
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
      MuiCardContent: {
        styleOverrides: {
          root: {
            backgroundColor: backgroundColorPaper,
            color: textColorPrimary,
            padding: '1rem',
            '&:last-child': {
              paddingBottom: '1rem',
            },
          },
        },
      },
      MuiCardActions: {
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

export default cardStyles;
