export const autocompleteStyles = {
  root: {
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "inherit",
      },
    },
    transition: "0.3s",
    boxShadow: "0px 2px 4px -1px rgba(0, 0, 0, 0.2)",
  },
  inputRoot: {
    "&.MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "inherit",
      },
      "&:hover fieldset": {
        borderColor: "inherit",
      },
      "&.Mui-focused fieldset": {
        borderColor: "inherit",
      },
    },
  },
  listbox: {
    backgroundColor: "inherit",
    color: "inherit",
  },
  option: {
    '&[data-focus="true"]': {
      backgroundColor: "inherit",
      color: "inherit",
    },
    '&[aria-selected="true"]': {
      backgroundColor: "inherit",
      color: "inherit",
    },
  },
  groupLabel: {
    backgroundColor: "inherit",
    color: "inherit",
  },
  popupIndicator: {
    color: "inherit",
  },
  clearIndicator: {
    color: "inherit",
  },
};
