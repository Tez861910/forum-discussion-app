import palette from '../palette';

const listStyles = {
    root: {
      width: '100%',
      backgroundColor: palette.palette.background.paper,
      color: palette.palette.text.primary,
    },
    defaultProps: {
      MuiListItem: {
        styleOverrides: {
          root: {
            '&.Mui-selected': {
              backgroundColor: palette.palette.primary.main,
              '&:hover': {
                backgroundColor: palette.palette.secondary.main,
              },
            },
            '&:hover': {
              backgroundColor: palette.palette.background.default,
            },
          },
          button: {
            '&:hover': {
              backgroundColor: palette.palette.background.default,
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
      MuiListSubheader: {
        styleOverrides: {
          root: {
            color: palette.palette.text.primary,
            backgroundColor: palette.palette.primary.main,
          },
        },
      },
    },
};

export default listStyles;
