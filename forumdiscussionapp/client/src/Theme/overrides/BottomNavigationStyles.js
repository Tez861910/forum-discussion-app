// Define colors
const primaryColor = "inherit";
const textColorPrimary = "inherit";

export const bottomNavigationStyles = {
  defaultProps: {
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: primaryColor,
          transition: "0.3s",
          boxShadow: "0px 2px 4px -1px rgba(0, 0, 0, 0.2)",
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
