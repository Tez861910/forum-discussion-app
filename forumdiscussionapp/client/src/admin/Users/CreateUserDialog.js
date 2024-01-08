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

export function CreateUserDialog({
  open,
  handleClose,
  handleCreateUser,
  newUser,
  setNewUser,
}) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="create-dialog-title"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="create-dialog-title">Create User</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ width: "100%" }}>
          <TextField
            label="Name"
            type="text"
            value={newUser.UserName}
            onChange={(e) =>
              setNewUser((prevData) => ({
                ...prevData,
                UserName: e.target.value,
              }))
            }
            fullWidth
          />
          <TextField
            label="Email"
            type="email"
            value={newUser.UserEmail}
            onChange={(e) =>
              setNewUser((prevData) => ({
                ...prevData,
                UserEmail: e.target.value,
              }))
            }
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            value={newUser.UserPassword}
            onChange={(e) =>
              setNewUser((prevData) => ({
                ...prevData,
                UserPassword: e.target.value,
              }))
            }
            fullWidth
          />
          <TextField
            label="Address"
            type="text"
            value={newUser.Address}
            onChange={(e) =>
              setNewUser((prevData) => ({
                ...prevData,
                Address: e.target.value,
              }))
            }
            fullWidth
          />
          <TextField
            label="Phone Number"
            type="text"
            value={newUser.PhoneNumber}
            onChange={(e) =>
              setNewUser((prevData) => ({
                ...prevData,
                PhoneNumber: e.target.value,
              }))
            }
            fullWidth
          />
          <TextField
            label="Date of Birth"
            type="date"
            value={newUser.DateOfBirth}
            onChange={(e) =>
              setNewUser((prevData) => ({
                ...prevData,
                DateOfBirth: e.target.value,
              }))
            }
            fullWidth
          />
          <Select
            label="Gender"
            value={newUser.Gender}
            onChange={(e) =>
              setNewUser((prevData) => ({
                ...prevData,
                Gender: e.target.value,
              }))
            }
            fullWidth
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
          <TextField
            label="Avatar Path"
            type="text"
            value={newUser.AvatarPath}
            onChange={(e) =>
              setNewUser((prevData) => ({
                ...prevData,
                AvatarPath: e.target.value,
              }))
            }
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleCreateUser}
          variant="contained"
          color="secondary"
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
