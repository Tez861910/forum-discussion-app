import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Select, MenuItem, Stack } from '@mui/material';

function EditUserDialog({ open, handleClose, handleUpdateUser, updatedUserData, handleInputChange, roles }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="edit-dialog-title"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="edit-dialog-title">Edit User</DialogTitle>
      <DialogContent sx={{ pt: 2}}>
        <Stack spacing={2} sx={{ width: '100%' }}>
          <TextField
            label="Name"
            type="text"
            value={updatedUserData.UserName}
            onChange={(e) => handleInputChange('UserName', e.target.value)}
            fullWidth
          />
          <TextField
            label="Email"
            type="email"
            value={updatedUserData.UserEmail}
            onChange={(e) => handleInputChange('UserEmail', e.target.value)}
            fullWidth
          />
          <Select
            label="Role"
            value={updatedUserData.RoleID}
            onChange={(e) => handleInputChange('RoleID', e.target.value)}
            fullWidth
          >
            <MenuItem value="">
              <em>Choose Role</em>
            </MenuItem>
            {roles.map((role) => (
              <MenuItem key={role.roleId} value={role.roleId}>
                {role.roleName}
              </MenuItem>
            ))}
          </Select>
          <TextField
            label="Password"
            type="password"
            value={updatedUserData.UserPassword}
            onChange={(e) => handleInputChange('UserPassword', e.target.value)}
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="primary">
          Cancel
        </Button>
        <Button onClick={handleUpdateUser} variant="contained" color="secondary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditUserDialog;
