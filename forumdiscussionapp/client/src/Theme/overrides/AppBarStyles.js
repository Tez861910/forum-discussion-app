import palette from '../palette';

const appBarStyles = {
    root: {
      backgroundColor: palette.palette.primary.main,
      color: palette.palette.primary.contrastText,
    },
    defaultProps: {
      MuiToolbar: {
        styleOverrides: {
          root: {
            display: 'flex',
            justifyContent: 'space-between',
          },
          gutters: {
            paddingLeft: '16px',
            paddingRight: '16px',
          },
          regular: {
            minHeight: '64px',
            '@media (min-width:0px) and (orientation: landscape)': {
              minHeight: '56px',
            },
            '@media (min-width:600px)': {
              minHeight: '64px',
            },
          },
          dense: {
            minHeight: '48px',
          },
        },
      },
    },
};

export default appBarStyles;
