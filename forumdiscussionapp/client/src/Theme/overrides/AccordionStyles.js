import palette from '../palette';

const accordionStyles = {
  root: {
    margin: '16px 0',
    '&.Mui-expanded': {
      margin: '16px 0',
    },
  },
  rounded: {
    borderRadius: '4px',
  },
  gutters: {
    padding: '0 16px',
  },
  defaultProps: {
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          backgroundColor: palette.palette.default.primary.main,
          color: palette.palette.default.primary.contrastText,
          '&:hover': {
            backgroundColor: palette.palette.default.secondary.main,
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          backgroundColor: palette.palette.default.background.default,
          color: palette.palette.default.text.primary,
        },
      },
    },
  },
};

export default accordionStyles;
