import palette from '../palette';

const inputLabelStyles = {
  root: {
    color: palette.palette.default.secondary.main,
    '&.Mui-focused': {
      color: palette.palette.default.primary.main,
      transition: 'color 0.3s ease-in-out', 
    },
    display: 'flex',
    flex: 'auto',
    alignItems: 'center',
    padding: '0 10px', 
    '&:hover': { 
      color: palette.palette.default.primary.main,
    },
  },

  // Form control styles
  formControl: {
    position: 'center', 
    marginTop: '8px',
    minWidth: 200,
    padding: '0px',
    paddingRight: '10px',
    paddingBottom: '10px',
  },

  // Margin dense styles
  marginDense: {
    marginTop: '4px',
  },

  // Shrink styles
  shrink: {
    transform: 'translate(14px, -50%) scale(0.75)',
  },

  // Animated styles
  animated: {
    transition: 'all 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
  },

  // Filled styles
  filled: {
    '&$shrink': {
      transform: 'translate(14px, -50%) scale(0.75)',
    },
  },

  // Outlined styles
  outlined: {
    '&$shrink': {
      transform: 'translate(14px, -50%) scale(0.75)',
    },
  },
};

export default inputLabelStyles;
