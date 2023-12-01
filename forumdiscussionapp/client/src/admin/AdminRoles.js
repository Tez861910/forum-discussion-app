import * as React from 'react';
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
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
  CircularProgress,
  Grid,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import RoleUserModal from './RolesUserModal';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AdminRoles() {
  const [roles, setRoles] = React.useState([]);
  const [newRoleName, setNewRoleName] = React.useState('');
  const [editingRoleId, setEditingRoleId] = React.useState(null);
  const [updatedRoleName, setUpdatedRoleName] = React.useState('');
  const [deleteConfirmation, setDeleteConfirmation] = React.useState({ open: false, roleId: null });
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [userModalOpen, setUserModalOpen] = React.useState(false);
  const [selectedRoleId, setSelectedRoleId] = React.useState(null);

  React.useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8081/roles/roles/get');
      if (Array.isArray(response.data.roles)) {
        setRoles(response.data.roles);
      } else {
        console.error('Invalid response data format for roles:', response.data);
        setError('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching roles:', error);
      setError('Error fetching roles. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRole = async () => {
    try {
      const response = await axios.post('http://localhost:8081/roles/roles/create', { roleName: newRoleName });
      console.log('Create Role Response:', response.data);
      setNewRoleName('');
      fetchRoles();
    } catch (error) {
      console.error('Error creating role:', error);
      setError('Error creating role. Please try again.');
    }
  };

  const handleEditRole = async (roleId) => {
    try {
      const response = await axios.put(`http://localhost:8081/roles/roles/update/${roleId}`, {
        roleName: updatedRoleName,
      });
      console.log('Edit Role Response:', response.data);
      setEditingRoleId(null);
      setUpdatedRoleName('');
      fetchRoles();
    } catch (error) {
      console.error('Error updating role:', error);
      setError('Error updating role. Please try again.');
    }
  };

  const handleDeleteRole = async (roleId) => {
    setDeleteConfirmation({ open: true, roleId });
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.patch(`http://localhost:8081/roles/roles/delete/${deleteConfirmation.roleId}`);
      if (response.data.message === 'Role soft-deleted successfully') {
        console.log('Role soft-deleted successfully');
        fetchRoles();
      } else {
        console.error('Role soft-deletion failed');
        setError('Role soft-deletion failed');
      }
    } catch (error) {
      console.error('Error soft-deleting role:', error);
      setError('Error soft-deleting role. Please try again.');
    } finally {
      setDeleteConfirmation({ open: false, roleId: null });
    }
  };
  
  const cancelDelete = () => {
    setDeleteConfirmation({ open: false, roleId: null });
  };

  const handleEditRoleModal = (roleId) => {
    setEditingRoleId(roleId);
  };

  const handleRoleUserModal = (roleId) => {
    setUserModalOpen(true);
    setSelectedRoleId(roleId);
  };

  const renderRoleListItem = (role) => {
    const isEditing = editingRoleId === role.roleId;

    return (
      <ListItem key={role.roleId} divider>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={isEditing ? 6 : 8}>
            {isEditing ? (
              <TextField
                type="text"
                value={updatedRoleName}
                onChange={(e) => setUpdatedRoleName(e.target.value)}
                fullWidth
                variant="outlined"
                size="small"
              />
            ) : (
              <ListItemText
                primary={role.roleName}
                onClick={() => handleRoleUserModal(role.roleId)}
                sx={{ cursor: 'pointer', color: 'primary.main' }}
              />
            )}
          </Grid>
          <Grid item xs={isEditing ? 6 : 4}>
            {isEditing ? (
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                  onClick={() => handleEditRole(role.roleId)}
                  size="small"
                  style={{ marginRight: 8 }}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<CancelIcon />}
                  onClick={() => setEditingRoleId(null)}
                  size="small"
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => handleEditRoleModal(role.roleId)}
                  size="small"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteRole(role.roleId)}
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="users"
                  onClick={() => handleRoleUserModal(role.roleId)}  
                  size="small"
                >
                  {/* Add appropriate icon for managing users in the role */}
                </IconButton>
              </ListItemSecondaryAction>
            )}
          </Grid>
        </Grid>
      </ListItem>
    );
  };

  return (
    <Box sx={{ padding: 2, backgroundColor: '#f0deff', minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Admin Roles Management
      </Typography>
      {error && <Typography variant="body1" color="error" sx={{ marginBottom: 2 }}>{error}</Typography>}
      {loading && <CircularProgress sx={{ marginBottom: 2 }} />}
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h6" sx={{ marginBottom: 1 }}>
          Create Role
        </Typography>
        <TextField
          type="text"
          label="Role Name"
          variant="outlined"
          fullWidth
          value={newRoleName}
          onChange={(e) => setNewRoleName(e.target.value)}
          size="small"
          sx={{ marginBottom: 1 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateRole}
          size="small"
        >
          Create
        </Button>
      </Box>
      <List>
        {roles.length > 0 ? (
          roles.map((role) => renderRoleListItem(role))
        ) : (
          roles.length === 0 ? <ListItem>No roles available</ListItem> : null
        )}
      </List>
      <Dialog
        open={deleteConfirmation.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={cancelDelete}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Are you sure you want to delete this role?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      {userModalOpen && (
        <RoleUserModal
          onClose={() => setUserModalOpen(false)}
          selectedRoleId={selectedRoleId}
          open={userModalOpen}
        />
      )}
    </Box>
  );
}

export default AdminRoles;