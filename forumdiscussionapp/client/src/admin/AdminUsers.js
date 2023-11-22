import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import './adminuser.css';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    UserName: '',
    UserEmail: '',
    RoleID: '',
    UserPassword: '',
  });
  const [roles, setRoles] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [updatedUserData, setUpdatedUserData] = useState({
    UserName: '',
    UserEmail: '',
    RoleID: '',
    UserPassword: '',
  });
  const [deleteConfirmation, setDeleteConfirmation] = useState({ open: false, userId: null });
  const [createUserModalOpen, setCreateUserModalOpen] = useState(false);

  useEffect(() => {
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

  const handleUpdateUser = (userId) => {
    if (!updatedUserData.UserName || !updatedUserData.UserEmail || updatedUserData.RoleID === '') {
      setEditingUserId(null);
      return;
    }

    axios
      .put(`http://localhost:8081/users/users/update/${userId}`, updatedUserData)
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
    <div className="admin-users-container">
      <h1>Admin User Management</h1>
      <div className="create-user-form">
        <Button variant="contained" color="primary" onClick={() => setCreateUserModalOpen(true)}>
          Create User
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(users) &&
              users.map((user) => (
                <TableRow key={user.UserID}>
                  <TableCell>{user.UserName}</TableCell>
                  <TableCell>{user.UserEmail}</TableCell>
                  <TableCell>{getRoleName(user.RoleID)}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEditUser(user)}>Edit</Button>
                    <Button onClick={() => handleDeleteUser(user.UserID)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={createUserModalOpen}
        onClose={() => setCreateUserModalOpen(false)}
        aria-labelledby="create-user-dialog-title"
      >
        <DialogTitle id="create-user-dialog-title">Create User</DialogTitle>
        <DialogContent>
          <div className="dialog-create-user-form">
            <div className="form-field">
              <label htmlFor="create-name">Name</label>
              <TextField
                type="text"
                id="create-name"
                value={newUser.UserName}
                onChange={(e) => setNewUser({ ...newUser, UserName: e.target.value })}
              />
            </div>
            <div className="form-field">
              <label htmlFor="create-email">Email</label>
              <TextField
                type="email"
                id="create-email"
                value={newUser.UserEmail}
                onChange={(e) => setNewUser({ ...newUser, UserEmail: e.target.value })}
              />
            </div>
            <div className="form-field">
              <label htmlFor="create-password">Password</label>
              <TextField
                type="password"
                id="create-password"
                value={newUser.UserPassword}
                onChange={(e) => setNewUser({ ...newUser, UserPassword: e.target.value })}
              />
            </div>
            <div className="form-field">
              <label htmlFor="create-role">Role</label>
              <Select
                label="Role"
                id="create-role"
                value={newUser.RoleID}
                onChange={(e) => setNewUser({ ...newUser, RoleID: e.target.value })}
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
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateUserModalOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreateUser} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleteConfirmation.open}
        onClose={cancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this user?
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
      <Dialog
        open={editingUserId !== null}
        onClose={() => setEditingUserId(null)}
        aria-labelledby="edit-dialog-title"
      >
        <DialogTitle id="edit-dialog-title">Edit User</DialogTitle>
        <DialogContent>
          <div className="dialog-edit-user-form">
            <div className="form-field">
              <label htmlFor="edit-name">Name</label>
              <TextField
                type="text"
                id="edit-name"
                value={updatedUserData.UserName}
                onChange={(e) => handleInputChange('UserName', e.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="edit-email">Email</label>
              <TextField
                type="email"
                id="edit-email"
                value={updatedUserData.UserEmail}
                onChange={(e) => handleInputChange('UserEmail', e.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="edit-role">Role</label>
              <Select
                label="Role"
                id="edit-role"
                value={updatedUserData.RoleID}
                onChange={(e) => handleInputChange('RoleID', e.target.value)}
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
            </div>
            {/* Password Field */}
            <div className="form-field">
              <label htmlFor="edit-password">Password</label>
              <TextField
                type="password"
                id="edit-password"
                value={updatedUserData.UserPassword}
                onChange={(e) => handleInputChange('UserPassword', e.target.value)}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditingUserId(null)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleUpdateUser(editingUserId)} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AdminUsers;
