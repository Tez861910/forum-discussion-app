export const textFieldStyles = {
  root: {
    margin: "8px 0",
    transition: "0.3s",
    "&:hover": {
      boxShadow: "0px 2px 4px -1px rgba(0, 0, 0, 0.2)",
    },
  },

  defaultProps: {
    MuiInput: {
      styleOverrides: {
        root: {
          backgroundColor: "inherit",
          borderRadius: "4px",
          padding: "10px",
          transition: "0.3s",
          "&:hover": {
            backgroundColor: "inherit",
          },
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "inherit",
          fontWeight: "bold",
          textAlign: "center",
          transition: "0.3s",
          "&:hover": {
            color: "inherit",
          },
        },
      },
    },

    MuiInputAdornment: {
      styleOverrides: {
        root: {
          color: "inherit",
          transition: "0.3s",
          "&:hover": {
            color: "inherit",
          },
        },
      },
    },

    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: "inherit",
          transition: "0.3s",
          "&:hover": {
            color: "inherit",
          },
        },
      },
    },
  },
};
