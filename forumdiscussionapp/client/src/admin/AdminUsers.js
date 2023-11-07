import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './adminuser.css'; 

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
  }

  const fetchRoles = async () => {
    try {
      const response = await axios.get('http://localhost:8081/roles/roles/get');
      setRoles(response.data.roles);
      console.log('Roles fetched successfully');
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  }

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
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) {
      return;
    }

    axios
      .delete(`http://localhost:8081/users/users/delete/${userId}`)
      .then(() => {
        const updatedUsers = users.filter((user) => user.UserID !== userId);
        setUsers(updatedUsers);
        console.log('User deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
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
          <input
            type="text"
            placeholder="Name"
            value={newUser.UserName}
            onChange={(e) => setNewUser({ ...newUser, UserName: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.UserEmail}
            onChange={(e) => setNewUser({ ...newUser, UserEmail: e.target.value })}
          />
          <select
            value={newUser.RoleID}
            onChange={(e) => setNewUser({ ...newUser, RoleID: e.target.value })}
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role.roleId} value={role.roleId}>
                {role.roleName}
              </option>
            ))}
          </select>
          <select
            value={newUser.CourseID}
            onChange={(e) => setNewUser({ ...newUser, CourseID: e.target.value })}
          >
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course.CourseID} value={course.CourseID}>
                {course.CourseName}
              </option>
            ))}
          </select>
          <input
            type="password"
            placeholder="Password"
            value={newUser.UserPassword}
            onChange={(e) => setNewUser({ ...newUser, UserPassword: e.target.value })}
          />
          <button onClick={handleCreateUser}>Create User</button>
        </div>
        <ul>
          {Array.isArray(users) &&
            users.map((user) => (
              <li key={user.UserID}>
                {editingUserId === user.UserID ? (
                  <div>
                    <input
                      type="text"
                      placeholder="Name"
                      value={updatedUserData.UserName || user.UserName}
                      onChange={(e) => handleInputChange('UserName', e.target.value)}
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={updatedUserData.UserEmail || user.UserEmail}
                      onChange={(e) => handleInputChange('UserEmail', e.target.value)}
                    />
                    <select
                      value={updatedUserData.RoleID || user.RoleID}
                      onChange={(e) => handleInputChange('RoleID', e.target.value)}
                    >
                      <option value="">Select Role</option>
                      {roles.map((role) => (
                        <option key={role.roleId} value={role.roleId}>
                          {role.roleName}
                        </option>
                      ))}
                    </select>
                    <select
                      value={updatedUserData.CourseID || user.CourseID}
                      onChange={(e) => handleInputChange('CourseID', e.target.value)}
                    >
                      <option value="">Select Course</option>
                      {courses.map((course) => (
                        <option key={course.CourseID} value={course.CourseID}>
                          {course.CourseName}
                        </option>
                      ))}
                    </select>
                    <input
                      type="password"
                      placeholder="Password"
                      value={updatedUserData.UserPassword || ''}
                      onChange={(e) => handleInputChange('UserPassword', e.target.value)}
                    />
                    <button onClick={() => handleUpdateUser(user.UserID)}>Update</button>
                    <button onClick={() => setEditingUserId(null)}>Cancel</button>
                  </div>
                ) : (
                  <div>
                    <p>Name: {user.UserName}</p>
                    <p>Email: {user.UserEmail}</p>
                    <p>Role: {getRoleName(user.RoleID)}</p>
                    <p>Course: {getCourseName(user.CourseID)}</p>
                    <p>Password: {user.UserPassword}</p>
                    <div>
                      <button onClick={() => setEditingUserId(user.UserID)}>Edit</button>
                      <button onClick={() => handleDeleteUser(user.UserID)}>Delete</button>
                    </div>
                  </div>
                )}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminUsers;
