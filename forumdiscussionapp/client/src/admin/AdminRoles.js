import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import './adminrole.css';

function AdminRoles() {
  const [roles, setRoles] = useState([]);
  const [newRoleName, setNewRoleName] = useState('');
  const [editingRoleId, setEditingRoleId] = useState(null);
  const [updatedRoleName, setUpdatedRoleName] = useState('');
  const [deleteConfirmation, setDeleteConfirmation] = useState({ open: false, roleId: null });

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await axios.get('http://localhost:8081/roles/roles/get');
      console.log('API Response:', response.data);

      if (Array.isArray(response.data.roles)) {
        const transformedRoles = response.data.roles.map((row) => ({
          RoleID: row.roleId,
          RoleName: row.roleName,
        }));
        console.log('Transformed Roles:', transformedRoles);
        setRoles(transformedRoles);
      } else {
        console.error('Invalid response data format:', response.data);
      }
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const handleCreateRole = async () => {
    try {
      const response = await axios.post('http://localhost:8081/roles/roles/create', { roleName: newRoleName });
      console.log('Create Role Response:', response.data);
      setNewRoleName('');
      console.log('Role created successfully');
      fetchRoles(); // Refresh the list of roles
    } catch (error) {
      console.error('Error creating role:', error);
    }
  };

  const handleEditRole = async (roleId) => {
    try {
      const response = await axios.put(`http://localhost:8081/roles/roles/update/${roleId}`, {
        roleId: roleId,
        roleName: updatedRoleName,
      });
      console.log('Edit Role Response:', response.data);
      setEditingRoleId(null);
      setUpdatedRoleName('');
      console.log('Role updated successfully');
      fetchRoles(); // Refresh the list of roles
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  const handleDeleteRole = async (roleId) => {
    setDeleteConfirmation({ open: true, roleId });
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8081/roles/roles/delete/${deleteConfirmation.roleId}`);
      console.log('Delete Role Response:', response.data);
      console.log('Role deleted successfully');
      fetchRoles(); // Refresh the list of roles
    } catch (error) {
      console.error('Error deleting role:', error);
    } finally {
      setDeleteConfirmation({ open: false, roleId: null });
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmation({ open: false, roleId: null });
  };

  return (
    <div className="admin-roles-container">
      <Typography variant="h4">Manage Roles</Typography>
      <div>
        <Typography variant="h6">Create Role</Typography>
        <TextField
          type="text"
          label="Role Name"
          variant="outlined"
          fullWidth
          value={newRoleName}
          onChange={(e) => setNewRoleName(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleCreateRole}>
          Create
        </Button>
      </div>
      <List>
        {roles.length > 0 ? (
          roles.map((role) => (
            <ListItem key={role.RoleID} divider>
              {editingRoleId === role.RoleID ? (
                <>
                  <TextField
                    type="text"
                    value={updatedRoleName}
                    onChange={(e) => setUpdatedRoleName(e.target.value)}
                    className="edit-input"
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    onClick={() => handleEditRole(role.RoleID)}
                  >
                    Save
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<CancelIcon />}
                    onClick={() => setEditingRoleId(null)}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <ListItemText primary={role.RoleName} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="edit" onClick={() => setEditingRoleId(role.RoleID)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteRole(role.RoleID)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </>
              )}
            </ListItem>
          ))
        ) : (
          roles.length === 0 ? <ListItem key="no-roles">No roles available</ListItem> : null
        )}
      </List>

      <Dialog open={deleteConfirmation.open} onClose={cancelDelete}>
        <DialogTitle>Delete Role</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this role?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AdminRoles;
