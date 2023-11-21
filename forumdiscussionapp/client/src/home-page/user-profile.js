import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, TextField, Button, Modal, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const UserProfile = ({ isOpen, onClose }) => {
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

  const handleSave = async () => {
    const userId = localStorage.getItem('userId');

    try {
      await axios.put(`http://localhost:8081/users/users/update/users/${userId}`, {
        name: newName,
        email: newEmail,
        password: newPassword,
      });

      setEditing(false);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleNavigateBack = () => {
    onClose(); 
  };

  return (
    <Modal open={isOpen} onClose={() => { onClose(); setEditing(false); }}>
      <Box className="user-profile" sx={{ p: 3, width: 400, mx: 'auto' }}>
        <Typography variant="h6" mb={2}>
          User Profile
        </Typography>
        {editing ? (
          <>
            <TextField fullWidth label="Name" value={newName} onChange={(e) => setNewName(e.target.value)} mb={2} />
            <TextField fullWidth label="Email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} mb={2} />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              mb={2}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button variant="contained" color="primary" onClick={handleSave} sx={{ mr: 2 }}>
                Save
              </Button>
              <Button variant="contained" onClick={handleCancel}>
                Cancel
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Typography>Name: {userData.UserName}</Typography>
            <Typography>Email: {userData.UserEmail}</Typography>
            <Typography>Role: {userData.RoleName}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button variant="contained" color="primary" onClick={handleEdit} sx={{ mr: 2 }}>
                Edit
              </Button>
              <Button variant="contained" onClick={handleNavigateBack}>
                <ArrowBackIcon />
                Cancel
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default UserProfile;
