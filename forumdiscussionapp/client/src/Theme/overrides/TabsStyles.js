import palette from '../palette';

const tabsStyles = {
  defaultProps: {
    MuiTabs: {
      styleOverrides: {
        root: {
          backgroundColor: palette.palette.background.paper, 
          minHeight: 48, 
        },
        indicator: {
          backgroundColor: palette.palette.info.main, 
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          minWidth: 72, 
          '&:hover': {
            color: palette.palette.primary.main, 
            opacity: 1,
          },
          '&$selected': {
            color: palette.palette.secondary.main,
          },
          '&:focus': {
            color: palette.palette.secondary.main,
          },
        },
      },
    },
  },
};

export default tabsStyles;
