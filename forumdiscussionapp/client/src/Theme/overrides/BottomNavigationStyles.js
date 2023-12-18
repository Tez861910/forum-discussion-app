import palette from '../palette';

const primaryColor = palette.palette.default.primary.main;
const textColorPrimary = palette.palette.default.text.primary;

const bottomNavigationStyles = {
    defaultProps: {
      MuiBottomNavigation: {
        styleOverrides: {
          root: {
            backgroundColor: primaryColor,
            transition: '0.3s', 
            boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2)', 
          },
        },
      },
      MuiBottomNavigationAction: {
        styleOverrides: {
          root: {
            color: primaryColor,
          },
          selected: {
            color: textColorPrimary,
          },
        },
      },
    },
};

export default bottomNavigationStyles;
