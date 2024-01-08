import palette from "../palette";

const greyColor = palette.palette.default.grey[200];
const primaryMainColor = palette.palette.default.primary.main;
const warningMainColor = palette.palette.default.warning.main;
const transition = "0.3s";

export const textFieldStyles = {
  root: {
    margin: "8px 0",
    transition: transition,
  },

  defaultProps: {
    MuiInput: {
      styleOverrides: {
        root: {
          backgroundColor: greyColor,
          borderRadius: "4px",
          padding: "10px",
          transition: transition,
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: primaryMainColor,
          fontWeight: "bold",
          textAlign: "center",
          transition: transition,
        },
      },
    },

    MuiInputAdornment: {
      styleOverrides: {
        root: {
          color: primaryMainColor,
          transition: transition,
        },
      },
    },

    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: warningMainColor,
          transition: transition,
        },
      },
    },
  },
};
