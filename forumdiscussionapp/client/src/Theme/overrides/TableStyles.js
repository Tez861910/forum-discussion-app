const tableStyles = {
    defaultProps: {
      MuiTable: {
        styleOverrides: {
          root: {
            backgroundColor: '#1a237e',
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            color: '#1a237e',
          },
        },
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            backgroundColor: '#1a237e',
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            '&:nth-of-type(odd)': {
              backgroundColor: '#1a237e',
            },
          },
        },
      },
    },
  };
  
  export default tableStyles;
  