export const outlinedInputStyles = {
  root: {
    "& fieldset": {
      borderColor: "inherit",
      transition: "0.3s",
      boxShadow: "0px 2px 4px -1px rgba(0, 0, 0, 0.2)",
    },
    "&:hover fieldset": {
      borderColor: "inherit",
    },
    "&.Mui-focused fieldset": {
      borderColor: "inherit",
      boxShadow: "0px 4px 8px -2px rgba(0, 0, 0, 0.3)",
    },
  },
  input: {
    padding: "12px",
  },
  multiline: {
    padding: "10px",
  },
  adornedStart: {
    paddingLeft: "12px",
  },
  adornedEnd: {
    paddingRight: "12px",
  },
  notchedOutline: {
    borderColor: "inherit",
  },
  inputMarginDense: {
    paddingTop: "10.5px",
    paddingBottom: "10.5px",
  },
  inputMultiline: {
    padding: "0",
  },
  inputAdornedStart: {
    paddingLeft: "0",
  },
  inputAdornedEnd: {
    paddingRight: "0",
  },

  inputLabel: {
    transform: "translate(-50%, -50%)",
    left: "50%",
    top: "50%",
    position: "absolute",
    pointerEvents: "none",
  },
};
