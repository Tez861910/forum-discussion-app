import logobg from '../logobg.jpg';

const backdropStyles = {
    root: {
        backgroundImage: `url(${logobg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        transition: '0.3s',
        filter: 'blur(2px)', 
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
