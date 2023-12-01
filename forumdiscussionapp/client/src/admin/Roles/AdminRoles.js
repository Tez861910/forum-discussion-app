import * as React from 'react';
import axios from 'axios';
import {
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
  CircularProgress,
  Box,
} from '@mui/material';
import RoleListItem from './RoleListItem';
import RoleList from './RoleList';
import RoleUserModal from './RolesUserModal';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AdminRoles() {
  const [roles, setRoles] = React.useState([]);
  const [newRoleName, setNewRoleName] = React.useState('');
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

  const handleEditRole = async (roleId, updatedRoleName) => {
    try {
      const response = await axios.put(`http://localhost:8081/roles/roles/update/${roleId}`, {
        roleName: updatedRoleName,
      });
      console.log('Edit Role Response:', response.data);
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

  const handleRoleUserModal = (roleId) => {
    setUserModalOpen(true);
    setSelectedRoleId(roleId);
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
      <RoleList roles={roles} handleEditRole={handleEditRole} handleDeleteRole={handleDeleteRole} handleRoleUserModal={handleRoleUserModal} />
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
