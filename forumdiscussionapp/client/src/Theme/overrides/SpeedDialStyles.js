import { palette } from "../palette";

const primaryMainColor = palette.palette.default.primary.main;
const textPrimaryColor = palette.palette.default.text.primary;
const infoMainColor = palette.palette.default.info.main;
const transition = "0.3s";

export const speedDialStyles = {
  root: {
    position: "fixed",
    transition: transition,
    "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
      bottom: "16px",
      right: "16px",
      transition: transition,
    },
    "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
      top: "16px",
      left: "16px",
      transition: transition,
    },
  },

  fab: {
    backgroundColor: primaryMainColor,
    color: textPrimaryColor,
    "&:hover": {
      backgroundColor: infoMainColor,
      transition: transition,
    },
    transition: transition,
  },

  directionUp: {
    transform: "rotate(45deg)",
    transition: transition,
  },

  directionRight: {
    transform: "rotate(135deg)",
    transition: transition,
  },

  directionDown: {
    transform: "rotate(-45deg)",
    transition: transition,
  },

  directionLeft: {
    transform: "rotate(-135deg)",
    transition: transition,
  },

  actions: {
    zIndex: 1,
    transition: transition,
  },

  actionsClosed: {
    transition: "top 0s 0.2s",
  },
};
