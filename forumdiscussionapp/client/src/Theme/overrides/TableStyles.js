// Define colors
const primaryMainColor = "inherit";
const textPrimaryColor = "inherit";

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
