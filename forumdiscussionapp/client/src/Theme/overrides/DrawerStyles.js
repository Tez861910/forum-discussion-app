import palette from '../palette';

const drawerStyles = {
    paper: {
      width: '240px',
      backgroundColor: palette.palette.default.background.paper,
    },
    defaultProps: {
      MuiList: {
        styleOverrides: {
          root: {
            width: '100%',
            maxWidth: '360px',
            backgroundColor: palette.palette.default.background.paper,
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            color: palette.palette.default.text.primary,
          },
          button: {
            '&:hover': {
              backgroundColor: palette.palette.default.primary.main,
            },
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            color: palette.palette.default.text.primary,
          },
        },
      },
      MuiListItemText: {
        styleOverrides: {
          root: {
            color: palette.palette.default.text.primary,
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            backgroundColor: palette.palette.default.primary.main,
          },
        },
      },
    },
};

export default drawerStyles;
