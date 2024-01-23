// Define common styles
const commonStyles = {
  padding: "1rem",
  borderRadius: "0.5rem",
  transition: "0.3s",
  boxShadow: "0px 2px 4px -1px rgba(0, 0, 0, 0.2)",
};

export const dialogStyles = {
  paper: {
    ...commonStyles,
    backgroundColor: "inherit",
    color: "inherit",
    "&:hover": {
      backgroundColor: "inherit",
      color: "inherit",
    },
  },
  defaultProps: {
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          ...commonStyles,
          backgroundColor: "inherit",
          color: "inherit",
          fontSize: "1.5rem",
          fontWeight: "bold",
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          ...commonStyles,
          backgroundColor: "inherit",
          color: "inherit",
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          ...commonStyles,
          backgroundColor: "inherit",
          color: "inherit",
          justifyContent: "center",
        },
      },
    },
  },
};
