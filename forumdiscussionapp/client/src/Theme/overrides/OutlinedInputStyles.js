import palette from '../palette';

const outlinedInputStyles = {
    root: {
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
    input: {
        padding: '12px',
    },
    multiline: {
        padding: '10px',
    },
    adornedStart: {
        paddingLeft: '12px',
    },
    adornedEnd: {
        paddingRight: '12px',
    },
    notchedOutline: {
        borderColor: palette.palette.default.primary.main,
    },
    inputMarginDense: {
        paddingTop: '10.5px',
        paddingBottom: '10.5px',
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
};

export default outlinedInputStyles;
