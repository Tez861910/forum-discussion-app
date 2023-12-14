import palette from '../palette';

const drawerStyles = {
    paper: {
      width: '240px',
      backgroundColor: palette.palette.background.paper,
    },
    defaultProps: {
      MuiList: {
        styleOverrides: {
          root: {
            width: '100%',
            maxWidth: '360px',
            backgroundColor: palette.palette.background.paper,
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            color: palette.palette.text.primary,
          },
          button: {
            '&:hover': {
              backgroundColor: palette.palette.primary.main,
            },
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            color: palette.palette.text.primary,
          },
        },
      },
      MuiListItemText: {
        styleOverrides: {
          root: {
            color: palette.palette.text.primary,
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            backgroundColor: palette.palette.primary.main,
          },
        },
      },
    },
};

export default drawerStyles;
