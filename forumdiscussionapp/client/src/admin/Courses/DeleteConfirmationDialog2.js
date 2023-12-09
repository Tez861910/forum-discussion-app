import * as React from 'react';
import { Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from '@mui/material';

function DeleteConfirmationDialog({ open, handleClose, handleConfirmDelete }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle id="alert-dialog-slide-title" sx={{ textAlign: 'center', bgcolor: 'error.main', color: 'common.white', py: 2 }}>
        Confirm Deletion
      </DialogTitle>
      <DialogContent sx={{ py: 3 }}>
        <Typography variant="body1" gutterBottom sx={{ textAlign: 'center', color: 'text.secondary' }}>
          Are you sure you want to delete this course?
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', bgcolor: 'background.default', py: 2 }}>
        <Button onClick={handleClose} color="primary" variant="contained" sx={{ textTransform: 'none', mr: 1, px: 3 }}>
          Cancel
        </Button>
        <Button onClick={handleConfirmDelete} color="secondary" variant="contained" sx={{ textTransform: 'none', px: 3 }}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default React.memo(DeleteConfirmationDialog);
