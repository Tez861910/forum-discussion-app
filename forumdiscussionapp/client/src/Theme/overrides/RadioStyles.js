import { palette } from "../palette";

const primaryMainColor = palette.palette.default.primary.main;
const greyColor = palette.palette.default.grey[400];
const transition = "0.3s";

export const radioStyles = {
  defaultProps: {
    MuiRadio: {
      styleOverrides: {
        root: {
          color: primaryMainColor,
          transition: transition,
          "&$checked": {
            color: primaryMainColor,
            transition: transition,
          },
        },

        colorSecondary: {
          "&$checked": {
            color: primaryMainColor,
            transition: transition,
          },
          "&$disabled": {
            color: greyColor,
            transition: transition,
          },
        },

        colorPrimary: {
          "&$checked": {
            color: primaryMainColor,
            transition: transition,
          },
          "&$disabled": {
            color: greyColor,
            transition: transition,
          },
        },
      },
    },

    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          color: primaryMainColor,
          transition: transition,
        },

        label: {
          color: primaryMainColor,
          transition: transition,
        },

        disabled: {
          color: greyColor,
          transition: transition,
        },
      },
    },

    MuiRadioGroup: {
      styleOverrides: {
        root: {
          flexDirection: "row",
          transition: transition,
        },
      },
    },
  },
};
