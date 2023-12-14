import palette from '../palette';

const switchStyles = {
  root: {
    color: palette.palette.default.primary.main,
  },
  switchBase: {
    color: palette.palette.default.primary.main,
    '&.Mui-checked': {
      color: palette.palette.default.primary.main,
    },
    '&.Mui-checked + .MuiSwitch-track': {
      backgroundColor: palette.palette.default.primary.main,
    },
  },
  thumb: {
    color: palette.palette.default.primary.main,
  },
  track: {
    backgroundColor: palette.palette.default.primary.main,
  },
  checked: {},
};

export default switchStyles;
