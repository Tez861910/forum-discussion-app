export const toggleButtonGroupStyles = {
  root: {
    display: "flex",
    borderRadius: "8px",
    overflow: "hidden",
    backgroundColor: "inherit",
  },

  grouped: {
    "&:not(:first-path)": {
      borderTopLeftRadius: "0",
      borderBottomLeftRadius: "0",
    },
    "&:not(:last-path)": {
      borderTopRightRadius: "0",
      borderBottomRightRadius: "0",
    },
    color: "inherit",
  },

  groupedHorizontal: {
    "&:not(:first-path)": {
      marginLeft: "-1px",
      borderTopLeftRadius: "0",
      borderBottomLeftRadius: "0",
    },
    "&:not(:last-path)": {
      borderTopRightRadius: "0",
      borderBottomRightRadius: "0",
    },
  },

  groupedVertical: {
    "&:not(:first-path)": {
      marginTop: "-1px",
      borderTopLeftRadius: "0",
      borderTopRightRadius: "0",
    },
    "&:not(:last-path)": {
      borderBottomRightRadius: "0",
      borderBottomLeftRadius: "0",
    },
  },
};
