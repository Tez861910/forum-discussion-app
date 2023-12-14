import palette from '../palette';

const listStyles = {
    root: {
      width: '100%',
      backgroundColor: palette.palette.default.background.paper,
      color: palette.palette.default.text.primary,
    },
    defaultProps: {
      MuiListItem: {
        styleOverrides: {
          root: {
            '&.Mui-selected': {
              backgroundColor: palette.palette.default.primary.main,
              '&:hover': {
                backgroundColor: palette.palette.default.secondary.main,
              },
            },
            '&:hover': {
              backgroundColor: palette.palette.default.background.default,
            },
          },
          button: {
            '&:hover': {
              backgroundColor: palette.palette.default.background.default,
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
      MuiListSubheader: {
        styleOverrides: {
          root: {
            color: palette.palette.default.text.primary,
            backgroundColor: palette.palette.default.primary.main,
          },
        },
      },
    },
};

export default listStyles;
