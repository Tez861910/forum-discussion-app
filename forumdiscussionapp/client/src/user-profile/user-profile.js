import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, TextField, Button } from '@mui/material';

function UserProfile({ userId }) {
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [editing, setEditing] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');

    if (storedUserId) {
      axios.get(`http://localhost:8081/users/users/get/${storedUserId}`)
        .then((response) => {
          setUserData(response.data.user);
          setNewName(response.data.user.UserName || '');
          setNewEmail(response.data.user.UserEmail || '');
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, []);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    axios.put(`http://localhost:8081/users/users/update/users/${userId}`, {
      name: newName,
      email: newEmail,
      password: newPassword,
    })
      .then(() => {
        setEditing(false);
      })
      .catch((error) => {
        console.error('Error updating user data:', error);
      });
  };

  return (
    <div>
      <Typography variant="h3">User Profile</Typography>
      {editing ? (
        <>
          <TextField label="Name" value={newName} onChange={(e) => setNewName(e.target.value)} />
          <TextField label="Email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
          <TextField label="Password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
        </>
      ) : (
        <>
          <Typography>Name: {userData ? userData.UserName : 'N/A'}</Typography>
          <Typography>Email: {userData ? userData.UserEmail : 'N/A'}</Typography>
          <Typography>Course: {userData ? userData.CourseName : 'N/A'}</Typography>
          <Typography>Role: {userData ? userData.RoleName : 'N/A'}</Typography>
          <Button variant="contained" color="primary" onClick={handleEdit}>Edit</Button>
        </>
      )}
    </div>
  );
}

export default UserProfile;
