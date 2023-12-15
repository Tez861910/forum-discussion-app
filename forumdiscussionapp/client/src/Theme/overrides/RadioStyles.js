import palette from '../palette';

const primaryMainColor = palette.palette.default.primary.main;
const greyColor = palette.palette.default.grey[400];

const radioStyles = {
  defaultProps: {
    MuiRadio: {
      styleOverrides: {
        root: {
          color: primaryMainColor,
          '&$checked': {
            color: primaryMainColor,
          },
        },
        
        colorSecondary: {
          '&$checked': {
            color: primaryMainColor,
          },
          '&$disabled': {
            color: greyColor,
          },
        },
        
        colorPrimary: {
          '&$checked': {
            color: primaryMainColor,
          },
          '&$disabled': {
            color: greyColor,
          },
        },
      },
    },
    
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          color: primaryMainColor,
        },
        
        label: {
          color: primaryMainColor,
        },
        
        disabled: {
          color: greyColor,
        },
      },
    },
    
    MuiRadioGroup: {
      styleOverrides: {
        root: {
          flexDirection: 'row',
        },
      },
    },
  },
};

export default radioStyles;
