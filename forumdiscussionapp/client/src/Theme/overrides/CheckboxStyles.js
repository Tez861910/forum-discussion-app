import palette from '../palette';

const primaryColor = palette.palette.default.primary.main;

const checkboxStyles = {
    defaultProps: {
        root: {
            color: primaryColor,
            transition: '0.3s', 
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
        },
        checked: {
            color: primaryColor,
        },
    },
};

export default checkboxStyles;
