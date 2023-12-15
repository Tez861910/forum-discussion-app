import palette from '../palette';

const primaryColor = palette.palette.default.primary.main;
const secondaryColor = palette.palette.default.secondary.main;
const contrastTextColor = palette.palette.default.primary.contrastText;

const fabStyles = {
    defaultProps: {
      MuiFab: {
        styleOverrides: {
          root: {
            backgroundColor: primaryColor,
            color: contrastTextColor,
            '&:hover': {
              backgroundColor: secondaryColor,
            },
          },
          primary: {
            backgroundColor: primaryColor,
            '&:hover': {
              backgroundColor: secondaryColor,
            },
          },
          secondary: {
            backgroundColor: secondaryColor,
            '&:hover': {
              backgroundColor: primaryColor,
            },
          },
        },
        variants: [
          {
            props: { variant: 'extended' },
            style: {
              backgroundColor: primaryColor,
              '&:hover': {
                backgroundColor: secondaryColor,
              },
            },
          },
        ],
      },
    },
};

export default fabStyles;
