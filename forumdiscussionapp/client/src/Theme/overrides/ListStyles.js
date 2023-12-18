import palette from '../palette';

const primaryColor = palette.palette.default.primary.main;
const secondaryColor = palette.palette.default.secondary.main;
const backgroundColor = palette.palette.default.background.default;
const paperColor = palette.palette.default.background.paper;
const textColor = palette.palette.default.text.primary;

const listStyles = {
    root: {
      width: '100%',
      backgroundColor: paperColor,
      color: textColor,
      transition: '0.3s', 
      boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2)', 
    },
    defaultProps: {
      MuiListItem: {
        styleOverrides: {
          root: {
            '&.Mui-selected': {
              backgroundColor: primaryColor,
              '&:hover': {
                backgroundColor: secondaryColor,
              },
            },
            '&:hover': {
              backgroundColor: backgroundColor,
            },
          },
          button: {
            '&:hover': {
              backgroundColor: backgroundColor,
            },
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            color: textColor,
          },
        },
      },
      MuiListItemText: {
        styleOverrides: {
          root: {
            color: textColor,
          },
        },
      },
      MuiListSubheader: {
        styleOverrides: {
          root: {
            color: textColor,
            backgroundColor: primaryColor,
          },
        },
      },
    },
};

export default listStyles;
