import palette from '../palette';

const stepperStyles = {
  defaultProps: {
    MuiStepper: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          padding: '24px',
        },
      },
    },
    MuiStep: {
      styleOverrides: {
        root: {
          padding: '8px',
          border: `1px solid ${palette.palette.default.primary.main}`,
          borderRadius: '4px',
          margin: '4px',
          '&$completed': {
            borderColor: palette.palette.default.grey[400],
          },
          '&$active': {
            borderColor: palette.palette.default.info.main,
            backgroundColor: palette.palette.default.background.paper,
          },
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        label: {
          color: palette.palette.default.primary.main,
          '&$active': {
            color: palette.palette.default.info.main,
          },
          '&$completed': {
            color: palette.palette.default.grey[400],
          },
        },
      },
    },
    MuiStepConnector: {
      styleOverrides: {
        line: {
          borderColor: palette.palette.default.primary.main,
        },
      },
    },
  },
};

export default stepperStyles;
