import * as React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  Box,
} from '@mui/material';

function CreateUserDialog({ open, handleClose, handleCreateUser, newUser, setNewUser, roles }) {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="create-dialog-title"
      >
        <DialogTitle id="create-dialog-title">Create User</DialogTitle>
        <DialogContent>
          <Box className="dialog-create-user-form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
              value={newUser.UserPassword}
              onChange={(e) =>
                setNewUser((prevData) => ({
                  ...prevData,
                  UserPassword: e.target.value,
                }))
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreateUser} color="secondary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  export default CreateUserDialog;