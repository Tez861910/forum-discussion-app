import palette from '../palette';

const cardStyles = {
    root: {
      padding: '16px',
      borderRadius: '8px',
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    },
    defaultProps: {
      MuiCardHeader: {
        styleOverrides: {
          root: {
            backgroundColor: palette.palette.default.primary.main,
            color: palette.palette.default.primary.contrastText,
            padding: '16px',
            fontSize: '1.5rem',
            fontWeight: 'bold',
          },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            backgroundColor: palette.palette.default.background.paper,
            color: palette.palette.default.text.primary,
            padding: '16px',
            '&:last-child': {
              paddingBottom: '16px',
            },
          },
        },
      },
      MuiCardActions: {
        styleOverrides: {
          root: {
            backgroundColor: palette.palette.default.primary.main,
            color: palette.palette.default.text.primary,
            padding: '16px',
            justifyContent: 'center',
          },
        },
      },
    },
};

export default cardStyles;
