import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";
import { useApi } from "../../home-page/Api";

export function EditUserDialog({
  open,
  handleClose,
  handleUpdateUser,
  updatedUserData,
  handleInputChange,
}) {
  const [genders, setGenders] = React.useState([]);
  const { api } = useApi();

  React.useEffect(() => {
    const fetchGenders = async () => {
      try {
        const response = await api.get("/users/genders/get/all");
        if (response.status === 200) {
          const genderArray = response.data.data.map((gender) => ({
            GenderID: gender.GenderID,
            GenderName: gender.GenderName,
          }));

          setGenders(genderArray);
        } else {
          console.error("Failed to fetch genders. Status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching genders:", error);
      }
    };

    fetchGenders();
  }, [api]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="edit-dialog-title"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="edit-dialog-title">Edit User</DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <Stack spacing={2} sx={{ width: "100%" }}>
          <TextField
            label="Name"
            type="text"
            value={updatedUserData.UserName}
            onChange={(e) => handleInputChange("UserName", e.target.value)}
            fullWidth
          />
          <TextField
            label="Email"
            type="email"
            value={updatedUserData.UserEmail}
            onChange={(e) => handleInputChange("UserEmail", e.target.value)}
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            value={updatedUserData.UserPassword}
            onChange={(e) => handleInputChange("UserPassword", e.target.value)}
            fullWidth
          />
          <TextField
            label="Address"
            type="text"
            value={updatedUserData.Address}
            onChange={(e) => handleInputChange("Address", e.target.value)}
            fullWidth
          />
          <TextField
            label="Phone Number"
            type="text"
            value={updatedUserData.PhoneNumber}
            onChange={(e) => handleInputChange("PhoneNumber", e.target.value)}
            fullWidth
          />
          <TextField
            label="Date of Birth"
            type="date"
            value={updatedUserData.DateOfBirth}
            onChange={(e) => handleInputChange("DateOfBirth", e.target.value)}
            fullWidth
          />
          <Select
            label="Gender"
            value={
              updatedUserData.Gender ? updatedUserData.Gender.GenderName : ""
            }
            onChange={(e) => handleInputChange("Gender", e.target.value)}
            fullWidth
          >
            {genders.map((gender) => (
              <MenuItem key={gender.GenderID} value={gender.GenderName}>
                {gender.GenderName}
              </MenuItem>
            ))}
          </Select>
          <TextField
            label="Avatar Path"
            type="text"
            value={updatedUserData.AvatarPath}
            onChange={(e) => handleInputChange("AvatarPath", e.target.value)}
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleUpdateUser}
          variant="contained"
          color="secondary"
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}
