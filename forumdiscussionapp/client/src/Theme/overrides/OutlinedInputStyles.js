import palette from '../palette';

const primaryColor = palette.palette.default.primary.main;
const secondaryColor = palette.palette.default.secondary.main;
const paddingValue = '12px';
const multilinePadding = '10px';
const densePadding = '10.5px';

const outlinedInputStyles = {
  root: {
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
  input: {
    padding: paddingValue,
  },
  multiline: {
    padding: multilinePadding,
  },
  adornedStart: {
    paddingLeft: paddingValue,
  },
  adornedEnd: {
    paddingRight: paddingValue,
  },
  notchedOutline: {
    borderColor: primaryColor,
  },
  inputMarginDense: {
    paddingTop: densePadding,
    paddingBottom: densePadding,
  },
  inputMultiline: {
    padding: '0',
  },
  inputAdornedStart: {
    paddingLeft: '0',
  },
  inputAdornedEnd: {
    paddingRight: '0',
  },

  inputLabel: {
    transform: 'translate(-50%, -50%)',
    left: '50%',
    top: '50%',
    position: 'absolute',
    pointerEvents: 'none',
  },
};

export default outlinedInputStyles;
