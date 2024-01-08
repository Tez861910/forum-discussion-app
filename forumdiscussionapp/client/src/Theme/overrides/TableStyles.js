import palette from "../palette";

const primaryMainColor = palette.palette.default.primary.main;
const textPrimaryColor = palette.palette.default.text.primary;
const transition = "0.3s";

export const tableStyles = {
  defaultProps: {
    MuiTable: {
      styleOverrides: {
        root: {
          backgroundColor: primaryMainColor,
          transition: transition,
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          color: textPrimaryColor,
          transition: transition,
        },
      },
    },

    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: primaryMainColor,
          transition: transition,
        },
      },
    },

    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:nth-of-type(odd)": {
            backgroundColor: primaryMainColor,
            transition: transition,
          },
        },
      },
    },
  },
};
