const speedDialStyles = {
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
    };

    export default speedDialStyles;