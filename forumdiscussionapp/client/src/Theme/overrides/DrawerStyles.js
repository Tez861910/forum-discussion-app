// Define common styles
const commonStyles = {
  width: "240px",
  backgroundColor: "inherit",
  color: "inherit",
  transition: "0.3s",
  boxShadow: "0px 2px 4px -1px rgba(0, 0, 0, 0.2)",
};

export const drawerStyles = {
  paper: {
    ...commonStyles,
    "&:hover": {
      backgroundColor: "inherit",
      color: "inherit",
    },
  },
  defaultProps: {
    MuiList: {
      styleOverrides: {
        root: {
          ...commonStyles,
          maxWidth: "360px",
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          color: "inherit",
        },
        button: {
          "&:hover": {
            backgroundColor: "inherit",
            color: "inherit",
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "inherit",
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          color: "inherit",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: "inherit",
        },
      },
    },
  },
};
