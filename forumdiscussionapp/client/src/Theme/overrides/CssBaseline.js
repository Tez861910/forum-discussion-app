import palette from '../palette';
import logobg from '../logobg.jpg';

const primaryColor = palette.palette.default.primary.main;
const textColorPrimary = palette.palette.default.text.primary;

const cssBaseline = {
    body: {
        backgroundImage: `url(${logobg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        color: textColorPrimary, 
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
            color: primaryColor,
          },
          '&::-moz-placeholder': {
            color: primaryColor,
          },
          '&:-ms-input-placeholder': {
            color: primaryColor,
          },
          '&::placeholder': {
            color: primaryColor,
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
