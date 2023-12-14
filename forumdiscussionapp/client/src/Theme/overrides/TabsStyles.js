import palette from '../palette';

const tabsStyles = {
  defaultProps: {
    MuiTabs: {
      styleOverrides: {
        root: {
          backgroundColor: palette.palette.default.background.paper, 
          minHeight: 48, 
        },
        indicator: {
          backgroundColor: palette.palette.default.info.main, 
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          minWidth: 72, 
          '&:hover': {
            color: palette.palette.default.primary.main, 
            opacity: 1,
          },
          '&$selected': {
            color: palette.palette.default.secondary.main,
          },
          '&:focus': {
            color: palette.palette.default.secondary.main,
          },
        },
      },
    },
  },
};

export default tabsStyles;
