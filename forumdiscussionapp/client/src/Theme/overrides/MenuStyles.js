import palette from '../palette';

const menuStyles = {
    defaultProps: {
      MuiMenu: {
        styleOverrides: {
          paper: {
            backgroundColor: palette.palette.default.background.default, 
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            '&:hover': {
              backgroundColor: palette.palette.default.background.paper, 
            },
            '&$selected': {
              backgroundColor: palette.palette.default.primary.main,
            },
          },
        },
      },
    },
};

export default menuStyles;
