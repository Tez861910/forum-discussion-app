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
          border: `1px solid ${palette.palette.primary.main}`,
          borderRadius: '4px',
          margin: '4px',
          '&$completed': {
            borderColor: palette.palette.grey[400],
          },
          '&$active': {
            borderColor: palette.palette.info.main,
            backgroundColor: palette.palette.background.paper,
          },
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        label: {
          color: palette.palette.primary.main, 
          '&$active': {
            color: palette.palette.info.main, 
          },
          '&$completed': {
            color: palette.palette.grey[400], 
          },
        },
      },
    },
    MuiStepConnector: {
      styleOverrides: {
        line: {
          borderColor: palette.palette.primary.main, 
        },
      },
    },
  },
};

export default stepperStyles;
