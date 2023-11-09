import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './adminuser.css';
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
} from '@mui/material';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    UserName: '',
    UserEmail: '',
    RoleID: '',
    UserPassword: '',
  });
  const [roles, setRoles] = useState([]);
  const [courses, setCourses] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [updatedUserData, setUpdatedUserData] = useState({
    UserName: '',
    UserEmail: '',
    RoleID: '',
    UserPassword: '',
  });
  const [deleteConfirmation, setDeleteConfirmation] = useState({ open: false, userId: null });

  useEffect(() => {
    fetchUsers();
    fetchRoles();
    fetchCourses();
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

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8081/courses/courses/get');
      setCourses(response.data.courses);
      console.log('Courses fetched successfully');
    } catch (error) {
      console.error('Error fetching courses:', error);
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
      .then((response) => {
        const createdUser = response.data;
        setUsers((prevUsers) => [...prevUsers, createdUser]);
        setNewUser({
          UserName: '',
          UserEmail: '',
          UserPassword: '',
          RoleID: '',
        });
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
      CourseID: user.CourseID,
      UserPassword: user.UserPassword,
    });
  };

  const handleUpdateUser = (userId) => {
    if (!updatedUserData.UserName || !updatedUserData.UserEmail || updatedUserData.RoleID === '' || updatedUserData.CourseID === '') {
      setEditingUserId(null);
      return;
    }

    axios
      .put(`http://localhost:8081/users/users/update/${userId}`, updatedUserData)
      .then((response) => {
        const updatedUser = response.data;
        const updatedUsers = users.map((user) =>
          user.UserID === userId ? updatedUser : user
        );
        setUsers(updatedUsers);
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
        const updatedUsers = users.filter((user) => user.UserID !== deleteConfirmation.userId);
        setUsers(updatedUsers);
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

  const getCourseName = (courseID) => {
    const course = courses.find((c) => c.CourseID === courseID);
    return course ? course.CourseName : 'N/A';
  };

  const getRoleName = (roleID) => {
    const role = roles.find((r) => r.roleId === roleID);
    return role ? role.roleName : 'N/A';
  };

  return (
    <div className="admin-users-container">
      <h1>Admin User Management</h1>
      <div className="create-user-form">
        <h2>Create User</h2>
        <div className="form-fields">
          <div className="form-field">
            <label htmlFor="name">Name</label>
            <TextField
              type="text"
              id="name"
              value={newUser.UserName}
              onChange={(e) => setNewUser({ ...newUser, UserName: e.target.value })}
            />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <TextField
              type="email"
              id="email"
              value={newUser.UserEmail}
              onChange={(e) => setNewUser({ ...newUser, UserEmail: e.target.value })}
            />
          </div>
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <TextField
              type="password"
              id="password"
              value={newUser.UserPassword}
              onChange={(e) => setNewUser({ ...newUser, UserPassword: e.target.value })}
            />
          </div>
          <div className="form-field">
            <label htmlFor="role">Role</label>
            <Select
              label="Role"
              id="role"
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
        <Button variant="contained" color="primary" onClick={handleCreateUser}>
          Create User
        </Button>
      </div>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Course</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) &&
            users.map((user) => (
              <tr key={user.UserID}>
                <td>{user.UserName}</td>
                <td>{user.UserEmail}</td>
                <td>{getRoleName(user.RoleID)}</td>
                <td>{getCourseName(user.CourseID)}</td>
                <td>{user.UserPassword}</td>
                <td>
                  <div className="user-actions">
                    <Button onClick={() => handleEditUser(user)}>Edit</Button>
                    <Button onClick={() => handleDeleteUser(user.UserID)}>Delete</Button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
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
              <label htmlFor="edit-password">Password</label>
              <TextField
                type="password"
                id="edit-password"
                value={updatedUserData.UserPassword}
                onChange={(e) => handleInputChange('UserPassword', e.target.value)}
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
            <div className="form-field">
              <label htmlFor="edit-course">Course</label>
              <Select
                label="Course"
                id="edit-course"
                value={updatedUserData.CourseID}
                onChange={(e) => handleInputChange('CourseID', e.target.value)}
              >
                <MenuItem value="">
                  <em>Choose Course</em>
                </MenuItem>
                {courses.map((course) => (
                  <MenuItem key={course.CourseID} value={course.CourseID}>
                    {course.CourseName}
                  </MenuItem>
                ))}
              </Select>
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
