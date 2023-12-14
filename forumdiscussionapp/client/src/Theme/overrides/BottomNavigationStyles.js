import palette from '../palette';

const bottomNavigationStyles = {
    defaultProps: {
      MuiBottomNavigation: {
        styleOverrides: {
          root: {
            backgroundColor: palette.palette.default.primary.main,
          },
        },
      },
      MuiBottomNavigationAction: {
        styleOverrides: {
          root: {
            color: palette.palette.default.primary.main,
          },
          selected: {
            color: palette.palette.default.text.primary,
          },
        },
      },
    },
};

export default bottomNavigationStyles;
