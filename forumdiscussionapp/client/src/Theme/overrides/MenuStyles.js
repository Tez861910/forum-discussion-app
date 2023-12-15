import palette from '../palette';

const primaryColor = palette.palette.default.primary.main;
const backgroundColor = palette.palette.default.background.default;
const paperColor = palette.palette.default.background.paper;

const menuStyles = {
    defaultProps: {
      MuiMenu: {
        styleOverrides: {
          paper: {
            backgroundColor: backgroundColor, 
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            '&:hover': {
              backgroundColor: paperColor, 
            },
            '&$selected': {
              backgroundColor: primaryColor,
            },
          },
        },
      },
    },
};

export default menuStyles;
