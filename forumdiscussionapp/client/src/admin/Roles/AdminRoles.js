import * as React from 'react';
import axios from 'axios';
import {
  Typography,
  Slide,
  CircularProgress,
  Box,
} from '@mui/material';
import RoleList from './RoleList';
import RoleUserModal from './RolesUserModal';
import DeleteConfirmationDialog from './DeleteConfirmationDialog3';
import CreateRoleSection from './CreateRoleSection';

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

  const handleCreateRole = async (newRoleName) => {
    try {
      const trimmedRoleName = newRoleName.trim();
  
      if (!trimmedRoleName) {
        console.error('Role name cannot be empty.');
        setError('Role name cannot be empty.');
        return;
      }
  
      console.log('Creating role:', trimmedRoleName);
  
      const response = await axios.post('http://localhost:8081/roles/roles/create', { roleName: trimmedRoleName });
  
      console.log('Create Role Response:', response);
  
      if (response.data && response.data.message === 'Role created successfully') {
        console.log('Role created successfully');
        setNewRoleName('');
        fetchRoles();
      } else {
        console.error('Error creating role:', response.data);
        if (response.data && response.data.error) {
          setError(response.data.error);
        } else {
          setError('Error creating role. Please try again.');
        }
      }
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
      <CreateRoleSection handleCreateRole={handleCreateRole} />
      <RoleList roles={roles} handleEditRole={handleEditRole} handleDeleteRole={handleDeleteRole} handleRoleUserModal={handleRoleUserModal} />
      <DeleteConfirmationDialog
        open={deleteConfirmation.open}
        handleCancel={cancelDelete}
        handleConfirm={confirmDelete}
      />
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