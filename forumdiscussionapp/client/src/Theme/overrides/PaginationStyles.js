import palette from '../palette';

const paginationStyles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    padding: '10px 0',
  },
  ul: {
    justifyContent: 'center',
  },
  defaultProps: {
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: palette.palette.default.primary.main, 
        },
        page: {
          '&.Mui-selected': {
            backgroundColor: palette.palette.default.primary.main, 
            color: palette.palette.default.text.primary, 
            '&:hover': {
              backgroundColor: palette.palette.default.info.main, 
            },
          },
        },
        previous: {
          color: palette.palette.default.primary.main, 
        },
        next: {
          color: palette.palette.default.primary.main,
        },
        first: {
          color: palette.palette.default.primary.main,
        },
        last: {
          color: palette.palette.default.primary.main,
        },
      },
    },
  },
};

export default paginationStyles;
