import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import RoleDropdown from './role-dropdown';
import { Link, useNavigate } from 'react-router-dom';
import { Container, TextField, Typography, Button } from '@mui/material';
import './sign-up.css';

const Signup = () => {
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

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }, []);

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

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    const validationErrors = {};
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
        const response = await axios.post('http://localhost:8081/signup/signup', formData);

        if (response.status === 200) {
          console.log('Signup successful');
          setSuccessMessage(['Signup successful']);
          navigate('/');
          setFormData({
            name: '',
            email: '',
            password: '',
            roleId: '',
          });
        } else {
          console.error('Signup failed. Status:', response.status);
          setErrors({ _error: 'Signup failed. Please try again.' });
        }
      } catch (error) {
        console.error('Error signing up user:', error);
        setErrors({ _error: 'Signup failed. Please try again.' });
      }
    }
  }, [formData, navigate]);

  return (
    <Container maxWidth="sm" className="signup-page">
      <div className="form">
        <Typography variant="h2">Sign-Up</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
            label="User Name"
          />
          {errors.name && <span className="text-danger">{errors.name}</span>}

          <TextField
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            fullWidth
            label="User Email"
          />
          {errors.email && <span className="text-danger">{errors.email}</span>}

          <TextField
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            fullWidth
            label="Password"
          />
          {errors.password && <span className="text-danger">{errors.password}</span>}

          <RoleDropdown roles={roles} roleId={formData.roleId} handleRoleChange={handleInputChange} errors={errors} />

          <Button type="submit" fullWidth variant="contained" color="success">
            Sign up
          </Button>
          {successMessage.map((message, index) => (
            <Typography key={index} variant="body2" className="success-message">
              {message}
            </Typography>
          ))}
          <Typography variant="body2">You agree to our terms and conditions</Typography>
          <Link to="/" variant="body2" className="btn btn-default w-100">
            Login
          </Link>
        </form>
      </div>
    </Container>
  );
};

export default Signup;
