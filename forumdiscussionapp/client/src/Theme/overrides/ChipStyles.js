import palette from '../palette';

const primaryColor = palette.palette.default.primary.main;
const textColorPrimary = palette.palette.default.text.primary;

const chipStyles = {
    root: {
        color: primaryColor,
    },
    label: {
        color: textColorPrimary,
    },
    deleteIcon: {
        color: primaryColor,
    },
};

export default chipStyles;
