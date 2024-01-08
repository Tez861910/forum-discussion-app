import { palette } from "../palette";

const primaryMainColor = palette.palette.default.primary.main;
const textPrimaryColor = palette.palette.default.text.primary;
const transition = "0.3s";

export const toggleButtonGroupStyles = {
  root: {
    display: "flex",
    borderRadius: "8px",
    overflow: "hidden",
    backgroundColor: primaryMainColor,
    transition: transition,
  },

  grouped: {
    "&:not(:first-path)": {
      borderTopLeftRadius: "0",
      borderBottomLeftRadius: "0",
      transition: transition,
    },
    "&:not(:last-path)": {
      borderTopRightRadius: "0",
      borderBottomRightRadius: "0",
      transition: transition,
    },
    color: textPrimaryColor,
    transition: transition,
  },

  groupedHorizontal: {
    "&:not(:first-path)": {
      marginLeft: "-1px",
      borderTopLeftRadius: "0",
      borderBottomLeftRadius: "0",
      transition: transition,
    },
    "&:not(:last-path)": {
      borderTopRightRadius: "0",
      borderBottomRightRadius: "0",
      transition: transition,
    },
    transition: transition,
  },

  groupedVertical: {
    "&:not(:first-path)": {
      marginTop: "-1px",
      borderTopLeftRadius: "0",
      borderTopRightRadius: "0",
      transition: transition,
    },
    "&:not(:last-path)": {
      borderBottomRightRadius: "0",
      borderBottomLeftRadius: "0",
      transition: transition,
    },
    transition: transition,
  },
};
