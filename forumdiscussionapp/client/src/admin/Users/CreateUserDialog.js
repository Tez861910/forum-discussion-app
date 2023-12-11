import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Select, MenuItem, Stack } from '@mui/material';

function CreateUserDialog({ open, handleClose, handleCreateUser, newUser, setNewUser, roles }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="create-dialog-title"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="create-dialog-title">Create User</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ width: '100%' }}>
          <TextField
            label="Name"
            type="text"
            value={newUser.UserName}
            onChange={(e) =>
              setNewUser((prevData) => ({
                ...prevData,
                UserName: e.target.value,
              }))
            }
            fullWidth
          />
          <TextField
            label="Email"
            type="email"
            value={newUser.UserEmail}
            onChange={(e) =>
              setNewUser((prevData) => ({
                ...prevData,
                UserEmail: e.target.value,
              }))
            }
            fullWidth
          />
          <Select
            label="Role"
            value={newUser.RoleID}
            onChange={(e) =>
              setNewUser((prevData) => ({
                ...prevData,
                RoleID: e.target.value,
              }))
            }
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
            value={newUser.UserPassword}
            onChange={(e) =>
              setNewUser((prevData) => ({
                ...prevData,
                UserPassword: e.target.value,
              }))
            }
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="primary">
          Cancel
        </Button>
        <Button onClick={handleCreateUser} variant="contained" color="secondary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateUserDialog;
