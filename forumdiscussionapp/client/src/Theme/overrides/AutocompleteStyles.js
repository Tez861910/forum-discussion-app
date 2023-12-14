import palette from '../palette';

const autocompleteStyles = {
    root: {
        '& .MuiOutlinedInput-root': {
          '&.Mui-focused fieldset': {
            borderColor: palette.palette.default.primary.main,
          },
        },
      },
      inputRoot: {
        '&.MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: palette.palette.default.secondary.main,
          },
          '&:hover fieldset': {
            borderColor: palette.palette.default.primary.main,
          },
          '&.Mui-focused fieldset': {
            borderColor: palette.palette.default.primary.main,
          },
        },
      },
      listbox: {
        backgroundColor: palette.palette.default.background.paper,
        color: palette.palette.default.text.primary,
      },
      option: {
        '&[data-focus="true"]': {
          backgroundColor: palette.palette.default.primary.main,
        },
        '&[aria-selected="true"]': {
          backgroundColor: palette.palette.default.secondary.main,
        },
      },
      groupLabel: {
        backgroundColor: palette.palette.default.background.paper,
        color: palette.palette.default.text.primary,
      },
      popupIndicator: {
        color: palette.palette.default.primary.main,
      },
      clearIndicator: {
        color: palette.palette.default.secondary.main,
      },
};

export default autocompleteStyles;
