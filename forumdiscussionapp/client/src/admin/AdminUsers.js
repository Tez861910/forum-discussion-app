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
    CourseID: '',
    UserPassword: '',
  });
  const [roles, setRoles] = useState([]);
  const [courses, setCourses] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [updatedUserData, setUpdatedUserData] = useState({
    UserName: '',
    UserEmail: '',
    RoleID: '',
    CourseID: '',
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
    if (!newUser.UserName || !newUser.UserEmail || newUser.RoleID === '' || newUser.CourseID === '') {
      console.error('Name, email, roleId, and courseId are required.');
      return;
    }

    axios
      .post('http://localhost:8081/users/users/create', {
        name: newUser.UserName,
        email: newUser.UserEmail,
        password: newUser.UserPassword,
        roleId: newUser.RoleID,
        courseId: newUser.CourseID,
      })
      .then((response) => {
        const createdUser = response.data;
        setUsers([...users, createdUser]);
        setNewUser({
          UserName: '',
          UserEmail: '',
          UserPassword: '',
          RoleID: '',
          CourseID: '',
        });
        console.log('User created successfully');
      })
      .catch((error) => {
        console.error('Error creating user:', error);
      });
  };

  const handleUpdateUser = (userId) => {
    if (Object.keys(updatedUserData).length === 0) {
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
        setUpdatedUserData({});
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
    <div>
      <div className="admin-users-container">
        <h1>Admin User Management</h1>
        <div>
          <h2>Create User</h2>
          <TextField
            type="text"
            label="Name"
            value={newUser.UserName}
            onChange={(e) => setNewUser({ ...newUser, UserName: e.target.value })}
          />
          <TextField
            type="email"
            label="Email"
            value={newUser.UserEmail}
            onChange={(e) => setNewUser({ ...newUser, UserEmail: e.target.value })}
          />
          <Select
            label="Role"
            value={newUser.RoleID}
            onChange={(e) => setNewUser({ ...newUser, RoleID: e.target.value })}
          >
            <MenuItem value="">
              <em>Select Role</em>
            </MenuItem>
            {roles.map((role) => (
              <MenuItem key={role.roleId} value={role.roleId}>
                {role.roleName}
              </MenuItem>
            ))}
          </Select>
          <Select
            label="Course"
            value={newUser.CourseID}
            onChange={(e) => setNewUser({ ...newUser, CourseID: e.target.value })}
          >
            <MenuItem value="">
              <em>Select Course</em>
            </MenuItem>
            {courses.map((course) => (
              <MenuItem key={course.CourseID} value={course.CourseID}>
                {course.CourseName}
              </MenuItem>
            ))}
          </Select>
          <TextField
            type="password"
            label="Password"
            value={newUser.UserPassword}
            onChange={(e) => setNewUser({ ...newUser, UserPassword: e.target.value })}
          />
          <Button variant="contained" color="primary" onClick={handleCreateUser}>
            Create User
          </Button>
        </div>
        <ul>
          {Array.isArray(users) &&
            users.map((user) => (
              <li key={user.UserID}>
                {editingUserId === user.UserID ? (
                  <div>
                    <TextField
                      type="text"
                      label="Name"
                      value={updatedUserData.UserName || user.UserName}
                      onChange={(e) => handleInputChange('UserName', e.target.value)}
                    />
                    <TextField
                      type="email"
                      label="Email"
                      value={updatedUserData.UserEmail || user.UserEmail}
                      onChange={(e) => handleInputChange('UserEmail', e.target.value)}
                    />
                    <Select
                      label="Role"
                      value={updatedUserData.RoleID || user.RoleID}
                      onChange={(e) => handleInputChange('RoleID', e.target.value)}
                    >
                      <MenuItem value="">
                        <em>Select Role</em>
                      </MenuItem>
                      {roles.map((role) => (
                        <MenuItem key={role.roleId} value={role.roleId}>
                          {role.roleName}
                        </MenuItem>
                      ))}
                    </Select>
                    <Select
                      label="Course"
                      value={updatedUserData.CourseID || user.CourseID}
                      onChange={(e) => handleInputChange('CourseID', e.target.value)}
                    >
                      <MenuItem value="">
                        <em>Select Course</em>
                      </MenuItem>
                      {courses.map((course) => (
                        <MenuItem key={course.CourseID} value={course.CourseID}>
                          {course.CourseName}
                        </MenuItem>
                      ))}
                    </Select>
                    <TextField
                      type="password"
                      label="Password"
                      value={updatedUserData.UserPassword || ''}
                      onChange={(e) => handleInputChange('UserPassword', e.target.value)}
                    />
                    <Button onClick={() => handleUpdateUser(user.UserID)}>Update</Button>
                    <Button onClick={() => setEditingUserId(null)}>Cancel</Button>
                  </div>
                ) : (
                  <div>
                    <p>Name: {user.UserName}</p>
                    <p>Email: {user.UserEmail}</p>
                    <p>Role: {getRoleName(user.RoleID)}</p>
                    <p>Course: {getCourseName(user.CourseID)}</p>
                    <p>Password: {user.UserPassword}</p>
                    <div>
                      <Button onClick={() => setEditingUserId(user.UserID)}>Edit</Button>
                      <Button onClick={() => handleDeleteUser(user.UserID)}>Delete</Button>
                    </div>
                  </div>
                )}
              </li>
            ))}
        </ul>
      </div>
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
    </div>
  );
}

export default AdminUsers;
