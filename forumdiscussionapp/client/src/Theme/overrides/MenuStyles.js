import palette from '../palette';

const menuStyles = {
    defaultProps: {
      MuiMenu: {
        styleOverrides: {
          paper: {
            backgroundColor: palette.palette.background.default, 
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            '&:hover': {
              backgroundColor: palette.palette.background.paper, 
            },
            '&$selected': {
              backgroundColor: palette.palette.primary.main,
            },
          },
        },
      },
    },
};

export default menuStyles;
