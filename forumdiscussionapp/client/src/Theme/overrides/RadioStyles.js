import palette from '../palette';

const radioStyles = {
  defaultProps: {
    MuiRadio: {
      styleOverrides: {
        root: {
          color: palette.palette.default.primary.main,
          '&$checked': {
            color: palette.palette.default.primary.main,
          },
        },
        colorSecondary: {
          '&$checked': {
            color: palette.palette.default.primary.main,
          },
          '&$disabled': {
            color: palette.palette.default.grey[400],
          },
        },
        colorPrimary: {
          '&$checked': {
            color: palette.palette.default.primary.main,
          },
          '&$disabled': {
            color: palette.palette.default.grey[400],
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          color: palette.palette.default.primary.main,
        },
        label: {
          color: palette.palette.default.primary.main,
        },
        disabled: {
          color: palette.palette.default.grey[400],
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
