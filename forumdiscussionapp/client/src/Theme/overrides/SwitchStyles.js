// Define colors
const primaryMainColor = "inherit";
const transition = "0.3s";

export const switchStyles = {
  root: {
    color: primaryMainColor,
    transition: transition,
    "&.Mui-checked": {
      transition: transition,
    },
  },

  switchBase: {
    color: primaryMainColor,
    "&.Mui-checked": {
      color: primaryMainColor,
      transition: transition,
    },
    "&.Mui-checked + .MuiSwitch-track": {
      backgroundColor: primaryMainColor,
      transition: transition,
    },
    transition: transition,
  },

  thumb: {
    color: primaryMainColor,
    transition: transition,
  },

  track: {
    backgroundColor: primaryMainColor,
    transition: transition,
  },
};
