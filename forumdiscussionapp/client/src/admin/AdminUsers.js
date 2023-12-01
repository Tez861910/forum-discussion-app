import * as React from 'react';
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
  Box,
  Typography,
} from '@mui/material';

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
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom component="div">
       Admin Users Management
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setCreateUserModalOpen(true)}
        sx={{ mb: 2 }}
      >
        Create User
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.UserID}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.UserName}
                </TableCell>
                <TableCell>{user.UserEmail}</TableCell>
                <TableCell>{getRoleName(user.RoleID)}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEditUser(user)}
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteUser(user.UserID)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={createUserModalOpen}
        onClose={() => setCreateUserModalOpen(false)}
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
        onClose={() => setDeleteConfirmation({ open: false, userId: null })}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
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
          <Box className="dialog-edit-user-form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Name"
              type="text"
              value={updatedUserData.UserName}
              onChange={(e) => handleInputChange('UserName', e.target.value)}
            />
            <TextField
              label="Email"
              type="email"
              value={updatedUserData.UserEmail}
              onChange={(e) => handleInputChange('UserEmail', e.target.value)}
            />
            <Select
              label="Role"
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
            {/* Password Field */}
            <TextField
              label="Password"
              type="password"
              value={updatedUserData.UserPassword}
              onChange={(e) => handleInputChange('UserPassword', e.target.value)}
            />
          </Box>
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
    </Box>
  );
}

export default AdminUsers;