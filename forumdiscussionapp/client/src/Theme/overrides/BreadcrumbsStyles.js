import palette from '../palette';

const breadcrumbsStyles = {
    root: {
      '& > * + *': {
        marginLeft: '8px',
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
      marginLeft: '8px',
      marginRight: '8px',
    },
    defaultProps: {
      MuiLink: {
        styleOverrides: {
          root: {
            color: palette.palette.default.primary.main,
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
