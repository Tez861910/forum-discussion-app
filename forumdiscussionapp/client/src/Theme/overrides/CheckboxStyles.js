import palette from '../palette';

const primaryColor = palette.palette.default.primary.main;

const checkboxStyles = {
    defaultProps: {
        root: {
            color: primaryColor,
        },
        checked: {
            color: primaryColor,
        },
    },
};

export default checkboxStyles;
