import palette from '../palette';

const progressStyles = {
  MuiLinearProgress: {
    styleOverrides: {
      root: {
        backgroundColor: palette.palette.default.primary.main,
      },
      bar: {
        backgroundColor: palette.palette.default.text.primary,
      },
    },
  },
  
  MuiCircularProgress: {
    styleOverrides: {
      root: {
        color: palette.palette.default.primary.main,
      },
    },
  },
};

export default progressStyles;
