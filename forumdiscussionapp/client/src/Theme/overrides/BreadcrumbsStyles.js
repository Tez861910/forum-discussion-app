import palette from '../palette';

const primaryColor = palette.palette.default.primary.main;

const breadcrumbsStyles = {
    root: {
      '& > * + *': {
        marginLeft: '0.5rem',
      },
    },
    ol: {
      display: 'flex',
      flexWrap: 'wrap',
      listStyle: 'none',
      padding: '0',
      margin: '0',
    },
    separator: {
      display: 'flex',
      userSelect: 'none',
      marginLeft: '0.5rem',
      marginRight: '0.5rem',
    },
    defaultProps: {
      MuiLink: {
        styleOverrides: {
          root: {
            color: primaryColor,
          },
          underlineHover: {
            textDecoration: 'none',
          },
          button: {
            '&:hover': {
              textDecoration: 'underline',
            },
          },
        },
      },
    },
};

export default breadcrumbsStyles;
