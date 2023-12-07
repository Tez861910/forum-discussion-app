import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Slide, CircularProgress, Box } from '@mui/material';
import RoleList from './RoleList';
import RoleUserModal from './RolesUserModal';
import DeleteConfirmationDialog from './DeleteConfirmationDialog3';
import CreateRoleSection from './CreateRoleSection';
import useApi from '../../home-page/Api'; 

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AdminRoles() {
  const [roles, setRoles] = useState([]);
  const [newRoleName, setNewRoleName] = useState('');
  const [updatedRoleName, setUpdatedRoleName] = useState('');
  const [deleteConfirmation, setDeleteConfirmation] = useState({ open: false, roleId: null });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState(null);

  const { api } = useApi();

  const fetchRoles = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/roles/roles/get');
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
  }, [api]);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  const handleCreateRole = useCallback(async (newRoleName) => {
    try {
      const trimmedRoleName = newRoleName.trim();
  
      if (!trimmedRoleName) {
        console.error('Role name cannot be empty.');
        setError('Role name cannot be empty.');
        return;
      }
  
      console.log('Creating role:', trimmedRoleName);
  
      const response = await api.post('/roles/roles/create', { roleName: trimmedRoleName });
  
      console.log('Create Role Response:', response.data);
  
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
  }, [api, fetchRoles]);

  const handleEditRole = useCallback(async (roleId, updatedRoleName) => {
    try {
      const response = await api.put(`/roles/roles/update/${roleId}`, {
        roleName: updatedRoleName,
      });
      console.log('Edit Role Response:', response.data);
      fetchRoles();
    } catch (error) {
      console.error('Error updating role:', error);
      setError('Error updating role. Please try again.');
    }
  }, [api, fetchRoles]);

  const handleDeleteRole = async (roleId) => {
    setDeleteConfirmation({ open: true, roleId });
  };

  const confirmDelete = useCallback(async () => {
    try {
      const response = await api.patch(`/roles/roles/delete/${deleteConfirmation.roleId}`);
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
  }, [api, deleteConfirmation, fetchRoles]);
  
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