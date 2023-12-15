import palette from '../palette';

const primaryColor = palette.palette.default.primary.main;
const secondaryColor = palette.palette.default.secondary.main;
const contrastTextColor = palette.palette.default.primary.contrastText;
const backgroundColorPaper = palette.palette.default.background.paper;

const autocompleteStyles = {
    root: {
        '& .MuiOutlinedInput-root': {
          '&.Mui-focused fieldset': {
            borderColor: primaryColor,
          },
        },
      },
      inputRoot: {
        '&.MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: secondaryColor,
          },
          '&:hover fieldset': {
            borderColor: primaryColor,
          },
          '&.Mui-focused fieldset': {
            borderColor: primaryColor,
          },
        },
      },
      listbox: {
        backgroundColor: backgroundColorPaper,
        color: contrastTextColor, 
      },
      option: {
        '&[data-focus="true"]': {
          backgroundColor: primaryColor,
          color: contrastTextColor, 
        },
        '&[aria-selected="true"]': {
          backgroundColor: secondaryColor,
          color: contrastTextColor, 
        },
      },
      groupLabel: {
        backgroundColor: backgroundColorPaper,
        color: contrastTextColor, 
      },
      popupIndicator: {
        color: primaryColor,
      },
      clearIndicator: {
        color: secondaryColor,
      },
};

export default autocompleteStyles;
