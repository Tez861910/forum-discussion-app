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
          backgroundColor: palette.palette.primary.main,
          color: palette.palette.primary.contrastText,
          '&:hover': {
            backgroundColor: palette.palette.secondary.main,
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          backgroundColor: palette.palette.background.default,
          color: palette.palette.text.primary,
        },
      },
    },
  },
};

export default accordionStyles;
