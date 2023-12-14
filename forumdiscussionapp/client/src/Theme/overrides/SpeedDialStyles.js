import palette from '../palette';

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
    backgroundColor: palette.palette.default.primary.main,
    color: palette.palette.default.text.primary,
    '&:hover': {
      backgroundColor: palette.palette.default.info.main,
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
