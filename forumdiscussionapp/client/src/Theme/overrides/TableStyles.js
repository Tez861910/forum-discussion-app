import palette from '../palette';

const tableStyles = {
  defaultProps: {
    MuiTable: {
      styleOverrides: {
        root: {
          backgroundColor: palette.palette.default.primary.main,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: palette.palette.default.text.primary,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: palette.palette.default.primary.main,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: palette.palette.default.primary.main,
          },
        },
      },
    },
  },
};

export default tableStyles;
