// Define common styles
const commonStyles = {
  width: "100%",
  backgroundColor: "inherit",
  color: "inherit",
  transition: "0.3s",
  boxShadow: "0px 2px 4px -1px rgba(0, 0, 0, 0.2)",
};

export const listStyles = {
  root: {
    ...commonStyles,
  },
  defaultProps: {
    MuiListItem: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: "inherit",
            "&:hover": {
              backgroundColor: "inherit",
            },
          },
          "&:hover": {
            backgroundColor: "inherit",
          },
        },
        button: {
          "&:hover": {
            backgroundColor: "inherit",
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
    MuiListSubheader: {
      styleOverrides: {
        root: {
          color: "inherit",
          backgroundColor: "inherit",
        },
      },
    },
  },
};
