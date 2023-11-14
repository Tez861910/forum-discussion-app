import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

function RoleUserModal({ open, onClose, roleId, fetchRoleUsers }) {
  const [roleUsers, setRoleUsers] = useState([]);
  const [newUserName, setNewUserName] = useState('');

  useEffect(() => {
    if (open) {
      fetchRoleUsers(roleId);
    }
  }, [open, roleId, fetchRoleUsers]);

  const handleAddUserToRole = async () => {
    try {
      const response = await axios.post(`http://localhost:8081/roles/${roleId}/users`, {
        userName: newUserName,
      });
      console.log('Add User Response:', response.data);
      setNewUserName('');
      fetchRoleUsers(roleId);
    } catch (error) {
      console.error('Error adding user to role:', error);
    }
  };

  const handleRemoveUserFromRole = async (userId) => {
    try {
      await axios.delete(`http://localhost:8081/roles/${roleId}/users/${userId}`);
      fetchRoleUsers(roleId);
    } catch (error) {
      console.error('Error removing user from role:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{`Users in Role ${roleId}`}</DialogTitle>
      <DialogContent>
        <List>
          {roleUsers.map((user, index) => (
            <ListItem key={index}>
              <ListItemText primary={user.userName} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleRemoveUserFromRole(user.userId)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
          <ListItem>
            <TextField
              type="text"
              label="User Name"
              variant="outlined"
              fullWidth
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleAddUserToRole}>
              Add User
            </Button>
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RoleUserModal;
