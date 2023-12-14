import palette from '../palette';

const inputLabelStyles = {
    root: {
        color: palette.palette.default.secondary.main,
        '&.Mui-focused': {
          color: palette.palette.default.primary.main,
        },
    },
    formControl: {
        position: 'relative',
        marginTop: '16px',
        minWidth: '0',
    },
    marginDense: {
        marginTop: '8px',
    },
    shrink: {
        transform: 'translate(0, 1.5px) scale(0.75)',
        transformOrigin: 'top left',
    },
    animated: {
        transition: 'all 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
    },
    filled: {
        '&$shrink': {
          transform: 'translate(12px, 7px) scale(0.75)',
        },
    },
    outlined: {
        '&$shrink': {
          transform: 'translate(14px, -6px) scale(0.75)',
        },
    },
};

export default inputLabelStyles;
