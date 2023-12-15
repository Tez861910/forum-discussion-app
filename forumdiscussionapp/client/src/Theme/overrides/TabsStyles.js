import palette from '../palette';

const paperColor = palette.palette.default.background.paper;
const infoMainColor = palette.palette.default.info.main;
const primaryMainColor = palette.palette.default.primary.main;
const secondaryMainColor = palette.palette.default.secondary.main;

const tabsStyles = {
  defaultProps: {
    MuiTabs: {
      styleOverrides: {
        root: {
          backgroundColor: paperColor, 
          minHeight: 48, 
        },
        indicator: {
          backgroundColor: infoMainColor, 
        },
      },
    },
    
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          minWidth: 72, 
          '&:hover': {
            color: primaryMainColor, 
            opacity: 1,
          },
          '&$selected': {
            color: secondaryMainColor,
          },
          '&:focus': {
            color: secondaryMainColor,
          },
        },
      },
    },
  },
};

export default tabsStyles;
