import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, TextField, Button } from '@mui/material';

function UserProfile({ userId }) {
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [editing, setEditing] = useState(false);
  const [userData, setUserData] = useState({
    UserName: 'N/A',
    UserEmail: 'N/A',
    RoleName: 'N/A',
  });

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');

    if (storedUserId) {
      axios
        .get(`http://localhost:8081/users/users/get/${storedUserId}`)
        .then((response) => {
          const user = response.data.user || {};

          setUserData({
            UserName: user.UserName || 'N/A',
            UserEmail: user.UserEmail || 'N/A',
            RoleName: user.RoleName || 'N/A',
          });

          setNewName(user.UserName || '');
          setNewEmail(user.UserEmail || '');
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
    axios
      .put(`http://localhost:8081/users/users/update/users/${userId}`, {
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

  const handleCancel = () => {
    setEditing(false);
  };

  return (
    <div>
      <Typography variant="h3">User Profile</Typography>
      {editing ? (
        <>
          <TextField label="Name" value={newName} onChange={(e) => setNewName(e.target.value)} />
          <TextField label="Email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
          <TextField
            label="Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="contained" color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </>
      ) : (
        <>
          <Typography>Name: {userData.UserName}</Typography>
          <Typography>Email: {userData.UserEmail}</Typography>
          <Typography>Role: {userData.RoleName}</Typography>
          <Button variant="contained" color="primary" onClick={handleEdit}>
            Edit
          </Button>
        </>
      )}
    </div>
  );
}

export default UserProfile;
