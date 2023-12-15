import palette from '../palette';

const primaryColor = palette.palette.priamry;
const contrastTextColor = palette.palette.default.primary.contrastText;

const appBarStyles = {
    root: {
      backgroundColor: primaryColor,
      color: contrastTextColor,
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
