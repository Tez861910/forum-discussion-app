import React, { useState, useEffect, useCallback } from 'react';
import { Button, Box, Typography , Slide} from '@mui/material';
import UserTable from './UserTable';
import CreateUserDialog from './CreateUserDialog';
import EditUserDialog from './EditUserDialog';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import useApi from '../../home-page/Api';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    UserName: '',
    UserEmail: '',
    RoleID: '',
    UserPassword: '',
  });
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState(null);
  const [editingUserId, setEditingUserId] = useState(null);
  const [updatedUserData, setUpdatedUserData] = useState({
    UserName: '',
    UserEmail: '',
    RoleID: '',
    UserPassword: '',
  });
  const [deleteConfirmation, setDeleteConfirmation] = useState({ open: false, userId: null });
  const [createUserModalOpen, setCreateUserModalOpen] = useState(false);

  const { api } = useApi();

  const fetchUsers = useCallback(async () => {
    try {
      const response = await api.get('/users/users/get');
      setUsers(response.data.users);
      console.log('Users fetched successfully');
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }, [api]);

  const fetchRoles = useCallback(async () => {
    try {
      const response = await api.get('/roles/roles/get');
      setRoles(response.data.roles);
      console.log('Roles fetched successfully');
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  }, [api]);

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, [fetchUsers, fetchRoles]);

  const handleCreateUser = useCallback(async () => {
    if (!newUser.UserName || !newUser.UserEmail || newUser.RoleID === '') {
      console.error('Name, email, and roleId are required.');
      return;
    }

    try {
      const response = await api.post('/users/users/create', {
        name: newUser.UserName,
        email: newUser.UserEmail,
        password: newUser.UserPassword,
        roleId: newUser.RoleID,
      });

      console.log('Create User Response:', response.data);
  
      if (response.data && response.data.message === 'User created successfully') {
        console.log('User created successfully');
        setNewUser({
          UserName: '',
          UserEmail: '',
          UserPassword: '',
          RoleID: '',
        });
        setCreateUserModalOpen(false);
        fetchUsers();
      } else {
        console.error('Error creating user:', response.data);
        if (response.data && response.data.error) {
          setError(response.data.error);
        } else {
          setError('Error creating user. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  }, [api, fetchUsers, newUser]);

  const handleEditUser = (user) => {
    setEditingUserId(user.UserID);
    setUpdatedUserData({
      UserName: user.UserName,
      UserEmail: user.UserEmail,
      RoleID: user.RoleID,
      UserPassword: '',
    });
  };

  const handleUpdateUser = useCallback(async () => {
    // Ensure updatedUserData is valid
    if (!updatedUserData.UserName || !updatedUserData.UserEmail || updatedUserData.RoleID === '') {
      setEditingUserId(null);
      return;
    }

    // Ensure editingUserId is not null or undefined
    if (editingUserId === null || editingUserId === undefined) {
      console.error('Invalid user ID for update');
      return;
    }

    try {
      const response = await api.put(`/users/users/update/${editingUserId}`, updatedUserData);

      console.log('Edit User Response:', response.data);
  
      if (response.data && response.data.message === 'User updated successfully') {
        console.log('User updated successfully');
        setEditingUserId(null);
        fetchUsers();
      } else {
        console.error('Error updating user:', response.data);
        if (response.data && response.data.error) {
          setError(response.data.error);
        } else {
          setError('Error updating user. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }, [api, fetchUsers, updatedUserData, editingUserId]);

  const handleDeleteUser = (userId) => {
    setDeleteConfirmation({ open: true, userId });
  };

  const confirmDelete = useCallback(async () => {
    try {
      const response = await api.delete(`/users/users/delete/${deleteConfirmation.userId}`);

      console.log('Delete User Response:', response.data);
  
      if (response.data && response.data.message === 'User deleted successfully') {
        console.log('User deleted successfully');
        setDeleteConfirmation({ open: false, userId: null });
        fetchUsers();
      } else {
        console.error('Error deleting user:', response.data);
        if (response.data && response.data.error) {
          setError(response.data.error);
        } else {
          setError('Error deleting user. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }, [api, deleteConfirmation, fetchUsers]);

  const cancelDelete = () => {
    setDeleteConfirmation({ open: false, userId: null });
  };

  const handleInputChange = (key, value) => {
    setUpdatedUserData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const getRoleName = (roleID) => {
    const role = roles.find((r) => r.roleId === roleID);
    return role ? role.roleName : 'N/A';
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom component="div">
        User Management
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setCreateUserModalOpen(true)}
        sx={{ mb: 2 }}
      >
        Create User
      </Button>
      <UserTable users={users} handleEditUser={handleEditUser} handleDeleteUser={handleDeleteUser} getRoleName={getRoleName} />
      <CreateUserDialog open={createUserModalOpen} handleClose={() => setCreateUserModalOpen(false)} handleCreateUser={handleCreateUser} newUser={newUser} setNewUser={setNewUser} roles={roles} TransitionComponent={Transition} />
      <DeleteConfirmationDialog open={deleteConfirmation.open} handleClose={() => setDeleteConfirmation({ open: false, userId: null })} handleDelete={confirmDelete} TransitionComponent={Transition} />
      <EditUserDialog open={editingUserId !== null} handleClose={() => setEditingUserId(null)} handleUpdateUser={handleUpdateUser} updatedUserData={updatedUserData} handleInputChange={handleInputChange} roles={roles} TransitionComponent={Transition} />
    </Box>
  );
}

export default AdminUsers;