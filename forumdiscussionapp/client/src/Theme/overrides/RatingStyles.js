import palette from "../palette";

const primaryMainColor = palette.palette.default.primary.main;
const infoMainColor = palette.palette.default.info.main;
const transition = "0.3s";

export const ratingStyles = {
  root: {
    color: primaryMainColor,
    transition: transition,
  },

  iconFilled: {
    color: primaryMainColor,
    transition: transition,
  },

  iconHover: {
    color: infoMainColor,
    transition: transition,
  },
};
