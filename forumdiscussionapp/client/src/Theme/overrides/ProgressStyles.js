import palette from '../palette';

const progressStyles = {
  MuiLinearProgress: {
    styleOverrides: {
      root: {
        backgroundColor: palette.palette.primary.main,
      },
      bar: {
        backgroundColor: palette.palette.text.primary,
      },
    },
  },
  MuiCircularProgress: {
    styleOverrides: {
      root: {
        color: palette.palette.primary.main,
      },
    },
  },
};

export default progressStyles;
