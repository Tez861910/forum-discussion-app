import palette from '../palette';

const primaryColor = palette.palette.default.primary.main;

const backdropStyles = {
    root: {
        backgroundColor: primaryColor,
    },
    invisible: {
        backgroundColor: 'transparent',
    },
    visible: {
        backgroundColor: primaryColor,
    },
};

export default backdropStyles;
