import palette from '../palette';
import logobg from '../logobg.jpg';

const cssBaseline = {
    body: {
        backgroundImage: `url(${logobg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        color: palette.palette.default.text.primary, 
    },
    '@global': {
        html: {
          WebkitFontSmoothing: 'auto',
        },
        a: {
          textDecoration: 'none',
        },
        img: {
          maxWidth: '100%',
          height: 'auto',
        },
        input: {
          '&::-webkit-input-placeholder': {
            color: palette.palette.default.primary.main,
          },
          '&::-moz-placeholder': {
            color: palette.palette.default.primary.main,
          },
          '&:-ms-input-placeholder': {
            color: palette.palette.default.primary.main,
          },
          '&::placeholder': {
            color: palette.palette.default.primary.main,
          },
        },
        '*': {
          boxSizing: 'border-box',
        },
        '*::before': {
          boxSizing: 'border-box',
        },
        '*::after': {
          boxSizing: 'border-box',
        },
    },
};

export default cssBaseline;
