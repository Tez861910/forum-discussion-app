import palette from '../palette';

const primaryMainColor = palette.palette.default.primary.main;
const textPrimaryColor = palette.palette.default.text.primary;

const tableStyles = {
  defaultProps: {
    MuiTable: {
      styleOverrides: {
        root: {
          backgroundColor: primaryMainColor,
        },
      },
    },
    
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: textPrimaryColor,
        },
      },
    },
    
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: primaryMainColor,
        },
      },
    },
    
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:nth-of-type(odd)': {
            backgroundColor: primaryMainColor,
          },
        },
      },
    },
  },
};

export default tableStyles;
