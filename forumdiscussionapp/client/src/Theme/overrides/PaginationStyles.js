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
          color: palette.palette.primary.main, 
        },
        page: {
          '&.Mui-selected': {
            backgroundColor: palette.palette.primary.main, 
            color: palette.palette.text.primary, 
            '&:hover': {
              backgroundColor: palette.palette.info.main, 
            },
          },
        },
        previous: {
          color: palette.palette.primary.main, 
        },
        next: {
          color: palette.palette.primary.main,
        },
        first: {
          color: palette.palette.primary.main,
        },
        last: {
          color: palette.palette.primary.main,
        },
      },
    },
  },
};

export default paginationStyles;
