import logobg from '../logobg.jpg';

const backdropStyles = {
    root: {
        backgroundImage: `url(${logobg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    },
    invisible: {
        backgroundColor: 'transparent',
    },
    visible: {
        backgroundImage: `url(${logobg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    },
};

export default backdropStyles;
