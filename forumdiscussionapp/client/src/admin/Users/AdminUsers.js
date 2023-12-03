import * as React from 'react';
import axios from 'axios';
import {
  Button,
  Box,
  Typography,
} from '@mui/material';
import UserTable from './UserTable';
import CreateUserDialog from './CreateUserDialog';
import EditUserDialog from './EditUserDialog';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';

function AdminUsers() {
  const [users, setUsers] = React.useState([]);
  const [newUser, setNewUser] = React.useState({
    UserName: '',
    UserEmail: '',
    RoleID: '',
    UserPassword: '',
  });
  const [roles, setRoles] = React.useState([]);
  const [editingUserId, setEditingUserId] = React.useState(null);
  const [updatedUserData, setUpdatedUserData] = React.useState({
    UserName: '',
    UserEmail: '',
    RoleID: '',
    UserPassword: '',
  });
  const [deleteConfirmation, setDeleteConfirmation] = React.useState({ open: false, userId: null });
  const [createUserModalOpen, setCreateUserModalOpen] = React.useState(false);

  React.useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8081/users/users/get');
      setUsers(response.data.users);
      console.log('Users fetched successfully');
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get('http://localhost:8081/roles/roles/get');
      setRoles(response.data.roles);
      console.log('Roles fetched successfully');
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const handleCreateUser = () => {
    if (!newUser.UserName || !newUser.UserEmail || newUser.RoleID === '') {
      console.error('Name, email, and roleId are required.');
      return;
    }

    axios
      .post('http://localhost:8081/users/users/create', {
        name: newUser.UserName,
        email: newUser.UserEmail,
        password: newUser.UserPassword,
        roleId: newUser.RoleID,
      })
      .then(() => {
        fetchUsers();
        setNewUser({
          UserName: '',
          UserEmail: '',
          UserPassword: '',
          RoleID: '',
        });
        setCreateUserModalOpen(false);
        console.log('User created successfully');
      })
      .catch((error) => {
        console.error('Error creating user:', error);
      });
  };

  const handleEditUser = (user) => {
    setEditingUserId(user.UserID);
    setUpdatedUserData({
      UserName: user.UserName,
      UserEmail: user.UserEmail,
      RoleID: user.RoleID,
      UserPassword: '',
    });
  };
  
  const handleUpdateUser = () => {
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
  
    axios
      .put(`http://localhost:8081/users/users/update/${editingUserId}`, updatedUserData)
      .then(() => {
        fetchUsers();
        setEditingUserId(null);
        console.log('User updated successfully');
      })
      .catch((error) => {
        console.error('Error updating user:', error);
      });
  };
  

  const handleDeleteUser = (userId) => {
    setDeleteConfirmation({ open: true, userId });
  };

  const confirmDelete = () => {
    axios
      .delete(`http://localhost:8081/users/users/delete/${deleteConfirmation.userId}`)
      .then(() => {
        fetchUsers();
        console.log('User deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      })
      .finally(() => {
        setDeleteConfirmation({ open: false, userId: null });
      });
  };

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
      <CreateUserDialog open={createUserModalOpen} handleClose={() => setCreateUserModalOpen(false)} handleCreateUser={handleCreateUser} newUser={newUser} setNewUser={setNewUser} roles={roles} />
      <DeleteConfirmationDialog open={deleteConfirmation.open} handleClose={() => setDeleteConfirmation({ open: false, userId: null })} handleDelete={confirmDelete} />
      <EditUserDialog open={editingUserId !== null} handleClose={() => setEditingUserId(null)} handleUpdateUser={handleUpdateUser} updatedUserData={updatedUserData} handleInputChange={handleInputChange} roles={roles} />
    </Box>
  );
}

export default AdminUsers;