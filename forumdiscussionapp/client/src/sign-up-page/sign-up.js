// Import necessary dependencies
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import RoleDropdown from './role-dropdown';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Container, Grid, Typography, TextField, Button } from '@mui/material';
import './sign-up.css';

// Signup component
const Signup = () => {
  // State variables
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    roleId: '',
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState([]);
  const [roles, setRoles] = useState([]);

  // Event handler for input changes
  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }, []);

  // Fetch roles data on component mount
  const fetchData = useCallback(async () => {
    try {
      const rolesResponse = await axios.get('http://localhost:8081/roles/roles/get');
      const rolesData = rolesResponse.data.roles;
      setRoles(rolesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Form submission handler
  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    const validationErrors = {};
    // Validate form data
    if (!formData.name) {
      validationErrors.name = 'Name is required';
    }
    if (!formData.email) {
      validationErrors.email = 'Email is required';
    }
    if (!formData.password) {
      validationErrors.password = 'Password is required';
    }
    if (!formData.roleId) {
      validationErrors.roleId = 'Role is required';
    }
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        // Submit data to the server
        const response = await axios.post('http://localhost:8081/signup/signup', formData);

        if (response.status === 200) {
          // Handle successful signup
          console.log('Signup successful');
          setSuccessMessage(['Signup successful']);
          navigate('/login');
          setFormData({
            name: '',
            email: '',
            password: '',
            roleId: '',
          });
        } else {
          // Handle signup failure
          console.error('Signup failed. Status:', response.status);
          setErrors({ _error: 'Signup failed. Please try again.' });
        }
      } catch (error) {
        // Handle error during signup
        console.error('Error signing up user:', error);
        setErrors({ _error: 'Signup failed. Please try again.' });
      }
    }
  }, [formData, navigate]);

  // Render the component
  return (
    <Container maxWidth="sm" className="signup-page">
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid item xs={12}>
          <div className="form">
            <Typography variant="h4">Sign-Up</Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="User Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                variant="outlined"
                error={!!errors.name}
                helperText={errors.name}
              />

              <TextField
                fullWidth
                label="User Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email}
              />

              <TextField
                fullWidth
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                variant="outlined"
                type="password"
                error={!!errors.password}
                helperText={errors.password}
              />

              <RoleDropdown
                roles={roles}
                roleId={formData.roleId}
                handleRoleChange={handleInputChange}
                errors={errors}
              />

              <Button type="submit" fullWidth variant="contained" color="primary">
                Sign up
              </Button>
              {successMessage.map((message, index) => (
                <Typography key={index} variant="body2" className="success-message">
                  {message}
                </Typography>
              ))}
              <Typography variant="body2">You agree to our terms and conditions</Typography>
              <Button
                component={RouterLink}
                to="/login"
                fullWidth
                variant="contained"
                color="primary"
                className="btn-default"
              >
                Login
              </Button>
            </form>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Signup;
