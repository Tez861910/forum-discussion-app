import palette from '../palette';

const primaryMainColor = palette.palette.default.primary.main;
const infoMainColor = palette.palette.default.info.main;
const greyColor = palette.palette.default.grey[400];
const paperColor = palette.palette.default.background.paper;
const transition = '0.3s'; 

const stepperStyles = {
  defaultProps: {
    MuiStepper: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          padding: '24px',
          transition: transition,
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
            transition: transition,
          },
          '&$active': {
            borderColor: infoMainColor,
            backgroundColor: paperColor,
            transition: transition, 
          },
          transition: transition, 
        },
      },
    },
    
    MuiStepLabel: {
      styleOverrides: {
        label: {
          color: primaryMainColor,
          '&$active': {
            color: infoMainColor,
            transition: transition, 
          },
          '&$completed': {
            color: greyColor,
            transition: transition, 
          },
          transition: transition, 
        },
      },
    },
    
    MuiStepConnector: {
      styleOverrides: {
        line: {
          borderColor: primaryMainColor,
          transition: transition, 
        },
      },
    },
  },
};

export default stepperStyles;
