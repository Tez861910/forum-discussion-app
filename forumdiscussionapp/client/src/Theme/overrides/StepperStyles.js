import palette from '../palette';

const primaryMainColor = palette.palette.default.primary.main;
const infoMainColor = palette.palette.default.info.main;
const greyColor = palette.palette.default.grey[400];
const paperColor = palette.palette.default.background.paper;

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
          border: `1px solid ${primaryMainColor}`,
          borderRadius: '4px',
          margin: '4px',
          '&$completed': {
            borderColor: greyColor,
          },
          '&$active': {
            borderColor: infoMainColor,
            backgroundColor: paperColor,
          },
        },
      },
    },
    
    MuiStepLabel: {
      styleOverrides: {
        label: {
          color: primaryMainColor,
          '&$active': {
            color: infoMainColor,
          },
          '&$completed': {
            color: greyColor,
          },
        },
      },
    },
    
    MuiStepConnector: {
      styleOverrides: {
        line: {
          borderColor: primaryMainColor,
        },
      },
    },
  },
};

export default stepperStyles;
