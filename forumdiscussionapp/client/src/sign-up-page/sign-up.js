import * as React from "react";
import axios from "axios";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Stack,
  Box,
  Paper,
  Select,
  MenuItem,
  Avatar,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import logo from "../start/logo.png";
import { SignUpValidation } from "./sign-up-validation";

export const Signup = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = React.useState({});
  const [successMessage, setSuccessMessage] = React.useState([]);
  const theme = useTheme();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted");

    const validationErrors = SignUpValidation(formData);
    console.log("Validation Errors:", validationErrors);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        console.log("Sending request");
        const response = await axios.post(
          "http://localhost:8081/signup/signup",
          formData
        );
        console.log("Response:", response);

        if (response.status === 200) {
          console.log("Signup successful");
          setSuccessMessage(["Signup successful"]);
          navigate("/login");
          setFormData({
            name: "",
            email: "",
            password: "",
            address: "",
            phoneNumber: "",
            dateOfBirth: "",
            gender: "",
          });
        } else {
          console.error("Signup failed. Status:", response.status);
          setErrors({ _error: "Signup failed. Please try again." });
        }
      } catch (error) {
        console.error("Error signing up user:", error);
        setErrors({ _error: "Signup failed. Please try again." });
      }
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8, mb: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          backgroundColor: theme.palette.background.paper,
          borderRadius: 2,
          opacity: 0.9,
          transition: "opacity .3s",
          "&:hover": { opacity: 1 },
        }}
      >
        <Stack spacing={2} justifyContent="center" alignItems="center">
          <Avatar
            src={logo}
            alt="Logo"
            sx={{ width: 100, height: 100, mb: 2 }}
          />

          <Typography variant="h3" align="center" gutterBottom>
            Sign-Up
          </Typography>

          {successMessage.length > 0 && (
            <Box sx={{ color: "green", mb: 2 }}>{successMessage}</Box>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="User Name"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              variant="outlined"
              error={!!errors.name}
              helperText={errors.name}
            />

            <TextField
              fullWidth
              label="User Email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email}
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              variant="outlined"
              error={!!errors.password}
              helperText={errors.password}
            />

            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              variant="outlined"
            />

            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
              variant="outlined"
            />

            <TextField
              fullWidth
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) =>
                setFormData({ ...formData, dateOfBirth: e.target.value })
              }
              variant="outlined"
            />

            <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
              <InputLabel htmlFor="gender">Gender</InputLabel>
              <Select
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3, mb: 2, opacity: 0.8 }}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <RouterLink to="/login" variant="body2">
                  Already have an account? Sign in
                </RouterLink>
              </Grid>
            </Grid>

            <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
              <Button
                type="button"
                variant="contained"
                color="secondary"
                fullWidth
                sx={{ opacity: 0.8 }}
                onClick={() => navigate("/")}
              >
                Go back to start
              </Button>
            </Grid>
          </form>
        </Stack>
      </Paper>
    </Container>
  );
};
