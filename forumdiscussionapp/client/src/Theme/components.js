import logobg from './logobg.jpg';

const components = {
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        borderRadius: '8px',
        padding: '12px 24px',
        backgroundColor: '#1a237e',
        color: '#ffffff',
        '&:hover': {
          backgroundColor: '#0d47a1',
        },
      },
      label: {
        color: '#ffffff',
      },
      text: {
        padding: '6px 8px',
      },
      textPrimary: {
        color: '#1a237e',
      },
      textSecondary: {
        color: '#ff6f00',
      },
      outlined: {
        padding: '6px 16px',
        border: '1px solid #1a237e',
      },
      outlinedPrimary: {
        borderColor: '#1a237e',
      },
      outlinedSecondary: {
        borderColor: '#ff6f00',
      },
      contained: {
        boxShadow: 'none',
        '&:active': {
          boxShadow: 'none',
        },
      },
      containedPrimary: {
        backgroundColor: '#1a237e',
        '&:hover': {
          backgroundColor: '#0d47a1',
        },
      },
      containedSecondary: {
        backgroundColor: '#ff6f00',
        '&:hover': {
          backgroundColor: '#c41c00',
        },
      },
      disableElevation: {
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none',
        },
        '&$focusVisible': {
          boxShadow: 'none',
        },
      },
      sizeSmall: {
        padding: '4px 8px',
        fontSize: '0.8125rem',
      },
      sizeLarge: {
        padding: '8px 24px',
        fontSize: '0.9375rem',
      },
      fullWidth: {
        width: '100%',
      },
      startIcon: {
        marginRight: '8px',
      },
      endIcon: {
        marginLeft: '8px',
      },
      iconSizeSmall: {
        '& > *:first-child': {
          fontSize: '18px',
        },
      },
      iconSizeMedium: {
        '& > *:first-child': {
          fontSize: '20px',
        },
      },
      iconSizeLarge: {
        '& > *:first-child': {
          fontSize: '22px',
        },
      },
    },
  },

  MuiButtonGroup: {
    styleOverrides: {
      root: {
        display: 'inline-flex',
        borderRadius: '8px',
      },
      grouped: {
        '&:not(:first-of-type)': {
          borderTopLeftRadius: '0',
          borderBottomLeftRadius: '0',
        },
        '&:not(:last-of-type)': {
          borderTopRightRadius: '0',
          borderBottomRightRadius: '0',
        },
      },
      groupedHorizontal: {
        '&:not(:first-child)': {
          marginLeft: '-1px',
          borderTopLeftRadius: '0',
          borderBottomLeftRadius: '0',
        },
        '&:not(:last-child)': {
          borderTopRightRadius: '0',
          borderBottomRightRadius: '0',
        },
      },
      groupedVertical: {
        '&:not(:first-child)': {
          marginTop: '-1px',
          borderTopLeftRadius: '0',
          borderTopRightRadius: '0',
        },
        '&:not(:last-child)': {
          borderBottomRightRadius: '0',
          borderBottomLeftRadius: '0',
        },
      },
    },
  },

  MuiInputLabel: {
    styleOverrides: {
      root: {
        color: '#ff6f00',
        '&.Mui-focused': {
          color: '#1a237e',
        },
      },
      formControl: {
        position: 'relative',
        marginTop: '16px',
        minWidth: '0',
      },
      marginDense: {
        marginTop: '8px',
      },
      shrink: {
        transform: 'translate(0, 1.5px) scale(0.75)',
        transformOrigin: 'top left',
      },
      animated: {
        transition: 'all 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
      },
      filled: {
        '&$shrink': {
          transform: 'translate(12px, 7px) scale(0.75)',
        },
      },
      outlined: {
        '&$shrink': {
          transform: 'translate(14px, -6px) scale(0.75)',
        },
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        '& fieldset': {
          borderColor: '#ff6f00',
        },
        '&:hover fieldset': {
          borderColor: '#1a237e',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#1a237e',
        },
      },
      input: {
        padding: '12px',
      },
      multiline: {
        padding: '10px',
      },
      adornedStart: {
        paddingLeft: '12px',
      },
      adornedEnd: {
        paddingRight: '12px',
      },
      notchedOutline: {
        borderColor: '#1a237e',
      },
      inputMarginDense: {
        paddingTop: '10.5px',
        paddingBottom: '10.5px',
      },
      inputMultiline: {
        padding: '0',
      },
      inputAdornedStart: {
        paddingLeft: '0',
      },
      inputAdornedEnd: {
        paddingRight: '0',
      },
    },
  },
  
  MuiTextField: {
    styleOverrides: {
      root: {
        margin: '8px 0',
      },
    },
    defaultProps: {
      MuiInput: {
        styleOverrides: {
          root: {
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
            padding: '10px',
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: '#1a237e',
            fontWeight: 'bold',
          },
        },
      },
      MuiInputAdornment: {
        styleOverrides: {
          root: {
            color: '#1a237e',
          },
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            color: '#ff6f00',
          },
        },
      },
    },
  },
  
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: '#1a237e',
        color: '#ffffff',
      },
    },
    defaultProps: {
      MuiToolbar: {
        styleOverrides: {
          root: {
            display: 'flex',
            justifyContent: 'space-between',
          },
          gutters: {
            paddingLeft: '16px',
            paddingRight: '16px',
          },
          regular: {
            minHeight: '64px',
            '@media (min-width:0px) and (orientation: landscape)': {
              minHeight: '56px',
            },
            '@media (min-width:600px)': {
              minHeight: '64px',
            },
          },
          dense: {
            minHeight: '48px',
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: '#ffffff',
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            color: '#ffffff',
          },
        },
      },
    },
  },
  
  MuiDrawer: {
    styleOverrides: {
      paper: {
        width: '240px',
        backgroundColor: '#311b92',
      },
    },
    defaultProps: {
      MuiList: {
        styleOverrides: {
          root: {
            width: '100%',
            maxWidth: '360px',
            backgroundColor: '#311b92',
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            color: '#ffffff',
          },
          button: {
            '&:hover': {
              backgroundColor: '#1a237e',
            },
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            color: '#ffffff',
          },
        },
      },
      MuiListItemText: {
        styleOverrides: {
          root: {
            color: '#ffffff',
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            backgroundColor: '#1a237e',
          },
        },
      },
    },
  },
  
  MuiCard: {
    styleOverrides: {
      root: {
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      },
    },
    defaultProps: {
      MuiCardHeader: {
        styleOverrides: {
          root: {
            backgroundColor: '#1a237e',
            color: '#ffffff',
            padding: '16px',
            fontSize: '1.5rem',
            fontWeight: 'bold',
          },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            backgroundColor: '#311b92',
            color: '#ffffff',
            padding: '16px',
            '&:last-child': {
              paddingBottom: '16px',
            },
          },
        },
      },
      MuiCardActions: {
        styleOverrides: {
          root: {
            backgroundColor: '#1a237e',
            color: '#ffffff',
            padding: '16px',
            justifyContent: 'center',
          },
        },
      },
    },
  },
  
  MuiDialog: {
    styleOverrides: {
      paper: {
        padding: '16px',
        borderRadius: '8px',
      },
    },
    defaultProps: {
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            backgroundColor: '#1a237e',
            color: '#ffffff',
            padding: '16px',
            fontSize: '1.5rem',
            fontWeight: 'bold',
          },
        },
      },
      MuiDialogContent: {
        styleOverrides: {
          root: {
            backgroundColor: '#311b92',
            color: '#ffffff',
            padding: '16px',
          },
        },
      },
      MuiDialogActions: {
        styleOverrides: {
          root: {
            backgroundColor: '#1a237e',
            color: '#ffffff',
            padding: '16px',
            justifyContent: 'center',
          },
        },
      },
    },
  },
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        backgroundImage: `url(${logobg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        color: '#ffffff', 
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
            color: '#1a237e',
          },
          '&::-moz-placeholder': {
            color: '#1a237e',
          },
          '&:-ms-input-placeholder': {
            color: '#1a237e',
          },
          '&::placeholder': {
            color: '#1a237e',
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
    },
  },
  
  MuiStack: {
    styleOverrides: {
      root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
    },
    defaultProps: {
      MuiBox: {
        styleOverrides: {
          root: {
            padding: '16px',
            borderRadius: '8px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            padding: '16px',
            backgroundColor: '#311b92',
            color: '#ffffff',
          },
        },
      },
      MuiGrid: {
        styleOverrides: {
          root: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          },
        },
      },
    },
  },
  
  MuiAutocomplete: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          '&.Mui-focused fieldset': {
            borderColor: '#1a237e',
          },
        },
      },
      inputRoot: {
        '&.MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#ff6f00',
          },
          '&:hover fieldset': {
            borderColor: '#1a237e',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#1a237e',
          },
        },
      },
      listbox: {
        backgroundColor: '#311b92',
        color: '#ffffff',
      },
      option: {
        '&[data-focus="true"]': {
          backgroundColor: '#1a237e',
        },
        '&[aria-selected="true"]': {
          backgroundColor: '#0d47a1',
        },
      },
      groupLabel: {
        backgroundColor: '#311b92',
        color: '#ffffff',
      },
      popupIndicator: {
        color: '#1a237e',
      },
      clearIndicator: {
        color: '#ff6f00',
      },
    },
  },
  
  MuiPagination: {
    styleOverrides: {
      root: {
        display: 'flex',
        justifyContent: 'center',
        padding: '10px 0',
      },
      ul: {
        justifyContent: 'center',
      },
    },
    defaultProps: {
      MuiPaginationItem: {
        styleOverrides: {
          root: {
            color: '#1a237e',
          },
          page: {
            '&.Mui-selected': {
              backgroundColor: '#1a237e',
              color: '#ffffff',
              '&:hover': {
                backgroundColor: '#0d47a1',
              },
            },
          },
          previous: {
            color: '#1a237e',
          },
          next: {
            color: '#1a237e',
          },
          first: {
            color: '#1a237e',
          },
          last: {
            color: '#1a237e',
          },
        },
      },
    },
  },
  
  MuiSkeleton: {
    styleOverrides: {
      root: {
        backgroundColor: '#eeeeee',
      },
      text: {
        transform: 'scale(1, 0.60)',
      },
      circle: {
        borderRadius: '50%',
      },
      rect: {
        borderRadius: '4px',
      },
      pulse: {
        animation: '$pulse 1.5s ease-in-out 0.5s infinite',
      },
      wave: {
        position: 'relative',
        overflow: 'hidden',
        '&::after': {
          animation: '$wave 1.6s linear 0.5s infinite',
          background: 'linear-gradient(90deg, transparent, #f0f0f0, transparent)',
          content: '""',
          position: 'absolute',
          transform: 'translateX(-100%)',
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
          zIndex: 1,
        },
      },
      withChildren: {
        '& > *': {
          visibility: 'hidden',
        },
      },
      fitContent: {
        maxWidth: 'fit-content',
      },
      heightAuto: {
        height: 'auto',
      },
    },
    keyframes: {
      pulse: {
        '0%': {
          opacity: 1,
        },
        '50%': {
          opacity: 0.4,
        },
        '100%': {
          opacity: 1,
        },
      },
      wave: {
        '0%': {
          transform: 'translateX(-100%)',
        },
        '60%': {
          transform: 'translateX(100%)',
        },
        '100%': {
          transform: 'translateX(100%)',
        },
      },
    },
  },
  
  MuiSpeedDial: {
    styleOverrides: {
      root: {
        position: 'fixed',
        '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
          bottom: '16px',
          right: '16px',
        },
        '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
          top: '16px',
          left: '16px',
        },
      },
      fab: {
        backgroundColor: '#1a237e',
        color: '#ffffff',
        '&:hover': {
          backgroundColor: '#0d47a1',
        },
      },
      directionUp: {
        transform: 'rotate(45deg)',
      },
      directionRight: {
        transform: 'rotate(135deg)',
      },
      directionDown: {
        transform: 'rotate(-45deg)',
      },
      directionLeft: {
        transform: 'rotate(-135deg)',
      },
      actions: {
        zIndex: 1,
      },
      actionsClosed: {
        transition: 'top 0s 0.2s',
      },
    },
  },
  
  MuiToggleButton: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        borderRadius: '8px',
        padding: '12px 24px',
        color: '#1a237e',
        '&.Mui-selected': {
          backgroundColor: '#1a237e',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#0d47a1',
          },
        },
        '&:hover': {
          backgroundColor: '#eeeeee',
        },
      },
      sizeSmall: {
        padding: '8px 16px',
        fontSize: '0.8125rem',
      },
      sizeLarge: {
        padding: '16px 32px',
        fontSize: '0.9375rem',
      },
      disabled: {
        color: '#bdbdbd',
      },
      label: {
        color: '#1a237e',
      },
    },
  },

  MuiToggleButtonGroup: {
    styleOverrides: {
      root: {
        display: 'flex',
        borderRadius: '8px',
        overflow: 'hidden',
      },
      grouped: {
        '&:not(:first-child)': {
          borderTopLeftRadius: '0',
          borderBottomLeftRadius: '0',
        },
        '&:not(:last-child)': {
          borderTopRightRadius: '0',
          borderBottomRightRadius: '0',
        },
      },
      groupedHorizontal: {
        '&:not(:first-child)': {
          marginLeft: '-1px',
          borderTopLeftRadius: '0',
          borderBottomLeftRadius: '0',
        },
        '&:not(:last-child)': {
          borderTopRightRadius: '0',
          borderBottomRightRadius: '0',
        },
      },
      groupedVertical: {
        '&:not(:first-child)': {
          marginTop: '-1px',
          borderTopLeftRadius: '0',
          borderTopRightRadius: '0',
        },
        '&:not(:last-child)': {
          borderBottomRightRadius: '0',
          borderBottomLeftRadius: '0',
        },
      },
    },
  },
  MuiAlert: {
    styleOverrides: {
      root: {
        width: '100%',
        borderRadius: '4px',
      },
      message: {
        padding: '8px 0',
      },
      action: {
        alignItems: 'flex-start',
      },
      icon: {
        padding: '7px 0',
      },
      filledSuccess: {
        color: '#ffffff',
        backgroundColor: '#4caf50',
      },
      filledInfo: {
        color: '#ffffff',
        backgroundColor: '#2196f3',
      },
      filledWarning: {
        color: '#ffffff',
        backgroundColor: '#ff9800',
      },
      filledError: {
        color: '#ffffff',
        backgroundColor: '#f44336',
      },
      outlinedSuccess: {
        color: '#4caf50',
        borderColor: '#4caf50',
      },
      outlinedInfo: {
        color: '#2196f3',
        borderColor: '#2196f3',
      },
      outlinedWarning: {
        color: '#ff9800',
        borderColor: '#ff9800',
      },
      outlinedError: {
        color: '#f44336',
        borderColor: '#f44336',
      },
      standardSuccess: {
        color: '#4caf50',
        backgroundColor: '#dcedc8',
      },
      standardInfo: {
        color: '#2196f3',
        backgroundColor: '#bbdefb',
      },
      standardWarning: {
        color: '#ff9800',
        backgroundColor: '#ffe0b2',
      },
      standardError: {
        color: '#f44336',
        backgroundColor: '#ffcdd2',
      },
    },
  },
  
  MuiAccordion: {
    styleOverrides: {
      root: {
        margin: '16px 0',
      },
      rounded: {
        borderRadius: '4px',
      },
      expanded: {
        margin: '16px 0',
      },
      gutters: {
        padding: '0 16px',
      },
    },
    defaultProps: {
      MuiAccordionSummary: {
        styleOverrides: {
          root: {
            backgroundColor: '#1a237e',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#0d47a1',
            },
          },
        },
      },
      MuiAccordionDetails: {
        styleOverrides: {
          root: {
            backgroundColor: '#311b92',
            color: '#ffffff',
          },
        },
      },
    },      
  
    MuiAvatar: {
        styleOverrides: {
          root: {
            width: '48px',
            height: '48px',
          },
          colorDefault: {
            backgroundColor: '#1a237e',
            color: '#ffffff',
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
        },
      },
      
  
      MuiBadge: {
        styleOverrides: {
          root: {
            marginRight: '16px',
          },
          badge: {
            backgroundColor: '#ff6f00',
            color: '#ffffff',
          },
          colorPrimary: {
            backgroundColor: '#1a237e',
          },
          colorSecondary: {
            backgroundColor: '#ff6f00',
          },
          colorError: {
            backgroundColor: '#f44336',
          },
          dot: {
            borderRadius: '50%',
          },
          anchorOriginTopRightRectangle: {
            top: '0',
            right: '0',
          },
          anchorOriginBottomRightRectangle: {
            bottom: '0',
            right: '0',
          },
          anchorOriginTopLeftRectangle: {
            top: '0',
            left: '0',
          },
          anchorOriginBottomLeftRectangle: {
            bottom: '0',
            left: '0',
          },
          anchorOriginTopRightCircular: {
            top: '14%',
            right: '14%',
          },
          anchorOriginBottomRightCircular: {
            bottom: '14%',
            right: '14%',
          },
          anchorOriginTopLeftCircular: {
            top: '14%',
            left: '14%',
          },
          anchorOriginBottomLeftCircular: {
            bottom: '14%',
            left: '14%',
          },
        },
      },
      
  
      MuiBreadcrumbs: {
        styleOverrides: {
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
        },
        defaultProps: {
          MuiLink: {
            styleOverrides: {
              root: {
                color: '#1a237e',
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
      },
      

  MuiCheckbox: {
    styleOverrides: {
      root: {
        color: '#1a237e',
      },
      checked: {
        color: '#1a237e',
      },
    },
  },
  },

  MuiList: {
    styleOverrides: {
      root: {
        width: '100%',
        backgroundColor: '#311b92',
        color: '#ffffff',
      },
    },
    defaultProps: {
      MuiListItem: {
        styleOverrides: {
          root: {
            '&.Mui-selected': {
              backgroundColor: '#1a237e',
              '&:hover': {
                backgroundColor: '#0d47a1',
              },
            },
            '&:hover': {
              backgroundColor: '#eeeeee',
            },
          },
          button: {
            '&:hover': {
              backgroundColor: '#eeeeee',
            },
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            color: '#ffffff',
          },
        },
      },
      MuiListItemText: {
        styleOverrides: {
          root: {
            color: '#ffffff',
          },
        },
      },
      MuiListSubheader: {
        styleOverrides: {
          root: {
            color: '#ffffff',
            backgroundColor: '#1a237e',
          },
        },
      },
    },
  },
  
  MuiRadio: {
    styleOverrides: {
      root: {
        color: '#1a237e',
        '&$checked': {
          color: '#1a237e',
        },
      },
      colorSecondary: {
        '&$checked': {
          color: '#1a237e',
        },
        '&$disabled': {
          color: '#bdbdbd',
        },
      },
      colorPrimary: {
        '&$checked': {
          color: '#1a237e',
        },
        '&$disabled': {
          color: '#bdbdbd',
        },
      },
    },
    defaultProps: {
      MuiFormControlLabel: {
        styleOverrides: {
          root: {
            color: '#1a237e',
          },
          label: {
            color: '#1a237e',
          },
          disabled: {
            color: '#bdbdbd',
          },
        },
      },
      MuiRadioGroup: {
        styleOverrides: {
          root: {
            flexDirection: 'row',
          },
        },
      },
    },
  },

};

export default components;