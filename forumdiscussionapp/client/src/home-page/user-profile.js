import React, { useState, useEffect } from 'react';
import {
  Typography,
  TextField,
  Button,
  Modal,
  Box
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useApi from './Api';

const UserProfile = ({ isOpen, onClose, setUserName }) => {
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [editing, setEditing] = useState(false);
  const [userData, setUserData] = useState({
    UserName: 'N/A',
    UserEmail: 'N/A',
    RoleName: 'N/A',
    Address: 'N/A',
    PhoneNumber: 'N/A',
    DateOfBirth: 'N/A',
    Gender: 'N/A',
    UserID: 'N/A',
  });

  const { api } = useApi();

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    if (userId) {
      const fetchData = async () => {
        try {
          const response = await api.get(`/users/users/get/${userId}`);
          const user = response.data.user || {};

          setUserData({
            UserName: user.UserName || 'N/A',
            UserEmail: user.UserEmail || 'N/A',
            RoleName: user.RoleName || 'N/A',
            Address: user.Address || 'N/A',
            PhoneNumber: user.PhoneNumber || 'N/A',
            DateOfBirth: user.DateOfBirth ? new Date(user.DateOfBirth).toLocaleDateString() : 'N/A',
            Gender: user.Gender || 'N/A',
            UserID: user.UserID || 'N/A',
          });

          setNewName(user.UserName || '');
          setNewEmail(user.UserEmail || '');
          setUserName(user.UserName || '');

        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchData();
    }
  }, [api]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    const userId = localStorage.getItem('userId');
  
    try {
      const updatedUserData = {
        name: newName,
        email: newEmail,
        password: newPassword,
        address: userData.Address,
        phoneNumber: userData.PhoneNumber,
        dateOfBirth: userData.DateOfBirth,
        gender: userData.Gender,
      };
  
      await api.put(`/users/users/update/users/${userId}`, updatedUserData);
  
      setUserData((prevData) => ({
        ...prevData,
        UserName: newName,
        UserEmail: newEmail,
        Address: updatedUserData.address,
        PhoneNumber: updatedUserData.phoneNumber,
        DateOfBirth: updatedUserData.dateOfBirth,
        Gender: updatedUserData.gender,
      }));
  
      setUserName(newName);
  
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

  const getUserIDLabel = (roleID, userID) => {
    switch (roleID) {
      case 1: // Admin
        return `AID: ${userID}`;
      case 2: // Teacher
        return `TID: ${userID}`;
      case 3: // Student
        return `SID: ${userID}`;
      default:
        return `ID: ${userID}`;
    }
  };

  return (
    <Modal open={isOpen} onClose={() => { onClose(); setEditing(false); }}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>
          User Profile
        </Typography>

        {editing ? (
          <>
            <TextField
              fullWidth
              label="Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              mb={2}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              mb={2}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              mb={2}
              sx={{ mb: 2 }}
            />
            <Typography mb={1} sx={{ fontWeight: 'medium' }}>Role: {userData.RoleName}</Typography>
            <Typography mb={1} sx={{ fontWeight: 'medium' }}>User ID: {getUserIDLabel(1, userData.UserID)}</Typography>
            <TextField
              fullWidth
              label="Address"
              value={userData.Address}
              onChange={(e) => setUserData((prevData) => ({ ...prevData, Address: e.target.value }))}
              mb={2}
            />
            <TextField
              fullWidth
              label="Phone Number"
              value={userData.PhoneNumber}
              onChange={(e) => setUserData((prevData) => ({ ...prevData, PhoneNumber: e.target.value }))}
              mb={2}
            />
            <TextField
              fullWidth
              label="Date of Birth"
              value={userData.DateOfBirth}
              onChange={(e) => setUserData((prevData) => ({ ...prevData, DateOfBirth: e.target.value }))}
              mb={2}
            />
            <TextField
              fullWidth
              label="Gender"
              value={userData.Gender}
              onChange={(e) => setUserData((prevData) => ({ ...prevData, Gender: e.target.value }))}
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
            <Typography mb={1} sx={{ fontWeight: 'medium' }}>{getUserIDLabel(1, userData.UserID)}</Typography>
            <Typography mb={1} sx={{ fontWeight: 'medium' }}>Name: {userData.UserName}</Typography>
            <Typography mb={1} sx={{ fontWeight: 'medium' }}>Email: {userData.UserEmail}</Typography>
            <Typography mb={1} sx={{ fontWeight: 'medium' }}>Role: {userData.RoleName}</Typography>
            <Typography mb={1} sx={{ fontWeight: 'medium' }}>Address: {userData.Address}</Typography>
            <Typography mb={1} sx={{ fontWeight: 'medium' }}>Phone Number: {userData.PhoneNumber}</Typography>
            <Typography mb={1} sx={{ fontWeight: 'medium' }}>Date of Birth: {userData.DateOfBirth}</Typography>
            <Typography mb={1} sx={{ fontWeight: 'medium' }}>Gender: {userData.Gender}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button variant="contained" color="primary" onClick={handleEdit} sx={{ mr: 2 }}>
                Edit
              </Button>
              <Button variant="contained" onClick={handleNavigateBack} startIcon={<ArrowBackIcon />}>
                Back
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: 8,
  boxShadow: 24,
  p: 4,
  color: 'text.primary',
  fontFamily: 'Roboto, sans-serif',
  fontWeight: 'normal',
  lineHeight: 'normal',
  letterSpacing: 'normal',
  textAlign: 'left',
};

export default UserProfile;
