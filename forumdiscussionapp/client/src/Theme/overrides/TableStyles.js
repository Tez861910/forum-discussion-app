import { palette } from "../palette";

// Define colors
const primaryMainColor = palette.palette.default.primary.main;
const textPrimaryColor = palette.palette.default.text.primary;

// Define common styles
const commonStyles = {
  transition: "0.3s",
};

export const tableStyles = {
  defaultProps: {
    MuiTable: {
      styleOverrides: {
        root: {
          backgroundColor: primaryMainColor,
          ...commonStyles,
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          color: textPrimaryColor,
          ...commonStyles,
        },
      },
    },

    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: primaryMainColor,
          ...commonStyles,
        },
      },
    },

    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:nth-of-type(odd)": {
            backgroundColor: primaryMainColor,
            ...commonStyles,
          },
        },
      },
    },
  },
};
