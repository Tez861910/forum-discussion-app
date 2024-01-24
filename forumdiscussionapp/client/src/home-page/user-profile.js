import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Button,
  Modal,
  Box,
  IconButton,
  AppBar,
  Toolbar,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import { useApi } from "./Api";

export const UserProfile = ({ isOpen, onClose, setUserName }) => {
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [editing, setEditing] = useState(false);
  const [userData, setUserData] = useState({
    UserName: "N/A",
    UserEmail: "N/A",
    RoleName: "N/A",
    Address: "N/A",
    PhoneNumber: "N/A",
    DateOfBirth: "N/A",
    Gender: "N/A",
    UserID: "N/A",
    RoleID: "N/A",
    AvatarPath: "/avatars/default.jpg",
  });

  const { api } = useApi();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      const fetchData = async () => {
        try {
          const response = await api.get(`/users/users/get/${userId}`);
          const user = response.data.user || {};

          setUserData({
            UserName: user.UserName || "N/A",
            UserEmail: user.UserEmail || "N/A",
            RoleName: user.UserRoles?.[0]?.Role?.RoleName || "N/A",
            Address: user.Address || "N/A",
            PhoneNumber: user.PhoneNumber || "N/A",
            DateOfBirth: user.DateOfBirth
              ? new Date(user.DateOfBirth).toLocaleDateString()
              : "N/A",
            Gender: user.Gender?.GenderName || "N/A",
            UserID: user.UserID || "N/A",
            RoleID: user.UserRoles?.[0]?.Role?.RoleID || "N/A",
            AvatarPath: user.AvatarPath || "/avatars/default.jpg", // Update with the correct property
          });

          setNewName(user.UserName || "");
          setNewEmail(user.UserEmail || "");
          setUserName(user.UserName || "");
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchData();
    }
  }, [api]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    const userId = localStorage.getItem("userId");

    try {
      const updatedUserData = {
        UserName: newName,
        UserEmail: newEmail,
        UserPassword: newPassword,
        Address: userData.Address,
        PhoneNumber: userData.PhoneNumber,
        DateOfBirth: userData.DateOfBirth,
        Gender: userData.Gender || "N/A",
      };

      const response = await api.put(`/users/users/update/users/${userId}`, {
        user: updatedUserData,
      });

      const updatedUser = response.data.user || {};

      setUserData((prevData) => ({
        ...prevData,
        UserName: updatedUser.UserName || "N/A",
        UserEmail: updatedUser.UserEmail || "N/A",
        Address: updatedUser.Address || "N/A",
        PhoneNumber: updatedUser.PhoneNumber || "N/A",
        DateOfBirth: updatedUser.DateOfBirth
          ? new Date(updatedUser.DateOfBirth).toLocaleDateString()
          : "N/A",
        Gender: updatedUser.Gender?.GenderName || "N/A",
      }));

      setUserName(updatedUser.UserName || "");

      setEditing(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleNavigateBack = () => {
    onClose();
  };

  const getUserIDLabel = (userRoles, userId) => {
    if (Array.isArray(userRoles) && userRoles.length > 0) {
      const role = userRoles[0].Role;
      const roleName = role ? role.RoleName : "N/A";

      switch (role.RoleID) {
        case 1:
          return `AID: ${userId}`;
        case 2:
          return `TID: ${userId}`;
        case 3:
          return `SID: ${userId}`;
        default:
          return `${roleName} ID: ${userId}`;
      }
    }

    return `ID: ${userId}`;
  };

  return (
    <Modal
      open={isOpen}
      onClose={() => {
        onClose();
        setEditing(false);
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: 8,
          boxShadow: 24,
          color: "text.primary",
          fontFamily: "Roboto, sans-serif",
          fontWeight: "normal",
          lineHeight: "normal",
          letterSpacing: "normal",
          textAlign: "left",
        }}
      >
        <Box>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleNavigateBack}
                sx={{ marginRight: 2 }}
              >
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h6">User Profile</Typography>
            </Toolbar>
          </AppBar>
        </Box>
        <Box sx={{ maxHeight: "60vh", overflowY: "auto", padding: 2 }}>
          {editing ? (
            <>
              <Typography variant="h6" sx={{ fontWeight: "medium", mb: 2 }}>
                Role: {userData.RoleName}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: "medium", mb: 2 }}>
                {getUserIDLabel(userData.RoleID, userData.UserID)}
              </Typography>
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
              <TextField
                fullWidth
                label="Address"
                value={userData.Address}
                onChange={(e) =>
                  setUserData((prevData) => ({
                    ...prevData,
                    Address: e.target.value,
                  }))
                }
                mb={2}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Phone Number"
                value={userData.PhoneNumber}
                onChange={(e) =>
                  setUserData((prevData) => ({
                    ...prevData,
                    PhoneNumber: e.target.value,
                  }))
                }
                mb={2}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Date of Birth"
                value={userData.DateOfBirth}
                onChange={(e) =>
                  setUserData((prevData) => ({
                    ...prevData,
                    DateOfBirth: e.target.value,
                  }))
                }
                mb={2}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Gender"
                value={userData.Gender || "N/A"}
                onChange={(e) =>
                  setUserData((prevData) => ({
                    ...prevData,
                    Gender: e.target.value,
                  }))
                }
                mb={2}
                sx={{ mb: 8 }}
              />
            </>
          ) : (
            <>
              <Typography variant="h6" sx={{ fontWeight: "medium", mb: 2 }}>
                {getUserIDLabel(userData.RoleID, userData.UserID)}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: "medium", mb: 2 }}>
                Name: {userData.UserName}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: "medium", mb: 2 }}>
                Email: {userData.UserEmail}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: "medium", mb: 2 }}>
                RoleName: {userData.RoleName}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: "medium", mb: 2 }}>
                Address: {userData.Address}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: "medium", mb: 2 }}>
                Phone Number: {userData.PhoneNumber}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: "medium", mb: 2 }}>
                Date of Birth: {userData.DateOfBirth}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: "medium", mb: 2 }}>
                Gender: {userData.Gender || "N/A"}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <IconButton color="primary" onClick={handleEdit}>
                  <EditIcon />
                </IconButton>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleNavigateBack}
                  startIcon={<ArrowBackIcon />}
                >
                  Back
                </Button>
              </Box>
            </>
          )}
        </Box>
        {editing && (
          <Box
            sx={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              p: 2,
              display: "flex",
              justifyContent: "flex-end",
              background: "#fff",
              boxShadow: "0 -4px 4px -4px rgba(0,0,0,0.1)",
            }}
          >
            <IconButton color="primary" onClick={handleSave}>
              <SaveIcon />
            </IconButton>
            <IconButton color="error" onClick={handleCancel}>
              <CancelIcon />
            </IconButton>
          </Box>
        )}
      </Box>
    </Modal>
  );
};
