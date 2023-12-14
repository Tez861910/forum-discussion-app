import palette from '../palette';

const avatarStyles = {
    root: {
        width: '48px',
        height: '48px',
    },
    colorDefault: {
        backgroundColor: palette.palette.default.primary.main,
        color: palette.palette.default.primary.contrastText,
    },
    img: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        textAlign: 'center',
        textIndent: '10000px',
    },
    fallback: {
        fontSize: '1rem',
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    },
};

export default avatarStyles;
