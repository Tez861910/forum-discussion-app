import palette from '../palette';

const autocompleteStyles = {
    root: {
        '& .MuiOutlinedInput-root': {
          '&.Mui-focused fieldset': {
            borderColor: palette.palette.primary.main,
          },
        },
      },
      inputRoot: {
        '&.MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: palette.palette.secondary.main,
          },
          '&:hover fieldset': {
            borderColor: palette.palette.primary.main,
          },
          '&.Mui-focused fieldset': {
            borderColor: palette.palette.primary.main,
          },
        },
      },
      listbox: {
        backgroundColor: palette.palette.background.paper,
        color: palette.palette.text.primary,
      },
      option: {
        '&[data-focus="true"]': {
          backgroundColor: palette.palette.primary.main,
        },
        '&[aria-selected="true"]': {
          backgroundColor: palette.palette.secondary.main,
        },
      },
      groupLabel: {
        backgroundColor: palette.palette.background.paper,
        color: palette.palette.text.primary,
      },
      popupIndicator: {
        color: palette.palette.primary.main,
      },
      clearIndicator: {
        color: palette.palette.secondary.main,
      },
};

export default autocompleteStyles;
