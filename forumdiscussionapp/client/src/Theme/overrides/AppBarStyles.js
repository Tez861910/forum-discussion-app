import palette from '../palette';

const primaryColor = palette.palette.default.primary.main;
const secondaryColor = palette.palette.default.secondary.main;
const contrastTextColorPrimary = palette.palette.default.primary.contrastText;
const contrastTextColorSecondary = palette.palette.default.secondary.contrastText;

const appBarStyles = {
    root: {
      backgroundColor: primaryColor,
      color: contrastTextColorPrimary,
      opacity: 0.9, 
      boxShadow: '0px 3px 5px 2px rgba(0, 0, 0, .3)', 
      borderRadius: '10px',
      transition: '0.3s',
      '&:hover': {
        backgroundColor: secondaryColor,
        color: contrastTextColorSecondary,
      },
    },
    defaultProps: {
      MuiToolbar: {
        styleOverrides: {
          root: {
            display: 'flex',
            justifyContent: 'space-between',
          },
          gutters: {
            paddingLeft: '1rem',
            paddingRight: '1rem',
          },
          regular: {
            minHeight: '4rem',
            '@media (min-width:0px) and (orientation: landscape)': {
              minHeight: '3.5rem',
            },
            '@media (min-width:600px)': {
              minHeight: '4rem',
            },
          },
          dense: {
            minHeight: '3rem',
          },
        },
      },
    },
};

export default appBarStyles;
