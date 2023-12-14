import palette from '../palette';

const bottomNavigationStyles = {
    defaultProps: {
      MuiBottomNavigation: {
        styleOverrides: {
          root: {
            backgroundColor: palette.palette.primary.main,
          },
        },
      },
      MuiBottomNavigationAction: {
        styleOverrides: {
          root: {
            color: palette.palette.primary.main,
          },
          selected: {
            color: palette.palette.text.primary,
          },
        },
      },
    },
};

export default bottomNavigationStyles;
