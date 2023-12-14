import palette from '../palette';

const switchStyles = {
  root: {
    color: palette.palette.primary.main,
  },
  switchBase: {
    color: palette.palette.primary.main,
    '&.Mui-checked': {
      color: palette.palette.primary.main,
    },
    '&.Mui-checked + .MuiSwitch-track': {
      backgroundColor: palette.palette.primary.main,
    },
  },
  thumb: {
    color: palette.palette.primary.main,
  },
  track: {
    backgroundColor: palette.palette.primary.main,
  },
  checked: {},
};

export default switchStyles;
