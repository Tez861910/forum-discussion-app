import palette from '../palette';

const primaryColor = palette.palette.default.primary.main;
const textColorPrimary = palette.palette.default.text.primary;
const backgroundColorPaper = palette.palette.default.background.paper;
const backgroundColorTransparent = 'rgba(255, 255, 255, 0.5)'; 

const drawerStyles = {
    paper: {
      width: '240px',
      backgroundColor: backgroundColorTransparent, 
    },
    defaultProps: {
      MuiList: {
        styleOverrides: {
          root: {
            width: '100%',
            maxWidth: '360px',
            backgroundColor: backgroundColorTransparent, 
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            color: textColorPrimary,
          },
          button: {
            '&:hover': {
              backgroundColor: primaryColor,
            },
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            color: textColorPrimary,
          },
        },
      },
      MuiListItemText: {
        styleOverrides: {
          root: {
            color: textColorPrimary,
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            backgroundColor: primaryColor,
          },
        },
      },
    },
};

export default drawerStyles;
