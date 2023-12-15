import palette from '../palette';

const shrinkTransform = (x, y, scale) => `translate(${x}, ${y}) scale(${scale})`;

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
        transform: shrinkTransform(0, '1.5px', 0.75),
        transformOrigin: 'top left',
    },
    animated: {
        transition: 'all 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
    },
    filled: {
        '&$shrink': {
          transform: shrinkTransform('12px', '7px', 0.75),
        },
    },
    outlined: {
        '&$shrink': {
          transform: shrinkTransform('14px', '-6px', 0.75),
        },
    },
};

export default inputLabelStyles;
