import palette from '../palette';

const radioStyles = {
  defaultProps: {
    MuiRadio: {
      styleOverrides: {
        root: {
          color: palette.palette.primary.main,
          '&$checked': {
            color: palette.palette.primary.main,
          },
        },
        colorSecondary: {
          '&$checked': {
            color: palette.palette.primary.main,
          },
          '&$disabled': {
            color: palette.palette.grey[400], 
          },
        },
        colorPrimary: {
          '&$checked': {
            color: palette.palette.primary.main, 
          },
          '&$disabled': {
            color: palette.palette.grey[400],
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          color: palette.palette.primary.main,
        },
        label: {
          color: palette.palette.primary.main, 
        },
        disabled: {
          color: palette.palette.grey[400], 
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
