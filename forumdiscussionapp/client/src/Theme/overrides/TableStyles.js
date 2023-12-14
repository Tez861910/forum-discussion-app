import palette from '../palette';

const tableStyles = {
  defaultProps: {
    MuiTable: {
      styleOverrides: {
        root: {
          backgroundColor: palette.palette.primary.main,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: palette.palette.text.primary,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: palette.palette.primary.main,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: palette.palette.primary.main,
          },
        },
      },
    },
  },
};

export default tableStyles;
