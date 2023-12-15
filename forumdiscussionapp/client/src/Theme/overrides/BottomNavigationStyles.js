import palette from '../palette';

const primaryColor = palette.palette.default.primary.main;
const textColorPrimary = palette.palette.default.text.primary;

const bottomNavigationStyles = {
    defaultProps: {
      MuiBottomNavigation: {
        styleOverrides: {
          root: {
            backgroundColor: primaryColor,
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
