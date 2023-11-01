import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './adminuser.css';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });

  useEffect(() => {
    
    axios.get('http://localhost:8081/users/users/get')
      .then((response) => {
        setUsers(response.data.users);
        console.log('Users fetched successfully');
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleCreateUser = () => {
  
    axios.post('http://localhost:8081/users/users/create', newUser)
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
    
    axios.put(`http://localhost:8081/users/users/update/:id`, updatedUserData)
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
    
    axios.delete(`http://localhost:8081/users/users/delete/:id`) 
      .then(() => {
        const updatedUsers = users.filter((user) => user.id !== userId);
        setUsers(updatedUsers);
        console.log('User deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  }

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
