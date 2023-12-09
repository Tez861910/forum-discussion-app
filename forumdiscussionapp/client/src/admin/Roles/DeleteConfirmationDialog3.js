import * as React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const DeleteConfirmationDialog = ({ open, handleCancel, handleConfirm }) => {
  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{"Confirm Deletion"}</DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          {"Are you sure you want to delete this role?"}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          {"Cancel"}
        </Button>
        <Button onClick={handleConfirm} color="secondary" autoFocus>
          {"Confirm"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
