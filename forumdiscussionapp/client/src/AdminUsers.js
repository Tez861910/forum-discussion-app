import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });

  useEffect(() => {
    // Fetch the list of users from the server (admin-specific endpoint)
    axios.get('http://localhost:8081/admin/users')
      .then((response) => {
        setUsers(response.data.users);
        console.log('Users fetched successfully');
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleCreateUser = () => {
    // Implement a function to create a new user by an admin
    axios.post('http://localhost:8081/admin/users', newUser)
      .then((response) => {
        setUsers([...users, response.data]);
        setNewUser({ name: '', email: '' });
        console.log('User created successfully');
      })
      .catch((error) => {
        console.error('Error creating user:', error);
      });
  };

  const handleUpdateUser = (userId, updatedUserData) => {
    // Implement a function to update a user's data by an admin
    axios.put(`http://localhost:8081/admin/users/${userId}`, updatedUserData)
      .then((response) => {
        const updatedUsers = users.map((user) =>
          user.id === userId ? response.data : user
        );
        setUsers(updatedUsers);
        console.log('User updated successfully');
      })
      .catch((error) => {
        console.error('Error updating user:', error);
      });
  };

  const handleDeleteUser = (userId) => {
    // Implement a function to delete a user by an admin
    axios.delete(`http://localhost:8081/admin/users/${userId}`)
      .then(() => {
        const updatedUsers = users.filter((user) => user.id !== userId);
        setUsers(updatedUsers);
        console.log('User deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };

  return (
    <div>
      <h2>Admin User Management</h2>
      <div>
        <h3>Create User</h3>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <button onClick={handleCreateUser}>Create User</button>
      </div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <span>Name: {user.name}</span>
            <span>Email: {user.email}</span>
            <button onClick={() => handleUpdateUser(user.id, { name: 'Updated Name' })}>Update</button>
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminUsers;
