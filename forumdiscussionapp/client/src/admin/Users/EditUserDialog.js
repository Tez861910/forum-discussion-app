import * as React from 'react';
import {
  TextField,
  Select,
  MenuItem,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';

function EditUserDialog({ open, handleClose, handleUpdateUser, updatedUserData, handleInputChange, roles }) {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="edit-dialog-title"
      >
        <DialogTitle id="edit-dialog-title">Edit User</DialogTitle>
        <DialogContent>
          <Box className="dialog-edit-user-form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Name"
              type="text"
              value={updatedUserData.UserName}
              onChange={(e) => handleInputChange('UserName', e.target.value)}
            />
            <TextField
              label="Email"
              type="email"
              value={updatedUserData.UserEmail}
              onChange={(e) => handleInputChange('UserEmail', e.target.value)}
            />
            <Select
              label="Role"
              value={updatedUserData.RoleID}
              onChange={(e) => handleInputChange('RoleID', e.target.value)}
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
            {/* Password Field */}
            <TextField
              label="Password"
              type="password"
              value={updatedUserData.UserPassword}
              onChange={(e) => handleInputChange('UserPassword', e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateUser} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  export default EditUserDialog;