import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import RoleDropdown from './role-dropdown';
import CourseDropdown from './course-dropdown';
import SignUpValidation from './sign-up-validation';
import { Link, useNavigate } from 'react-router-dom';
import { Container, TextField, Typography, Button } from '@mui/material';
import './sign-up.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    courseId: '',
    roleId: '',
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [roles, setRoles] = useState([]);
  const [courses, setCourses] = useState([]);

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }, []);

  const handleRoleChange = useCallback((event) => {
    const roleId = Number(event.target.value);
    setFormData((prevFormData) => ({ ...prevFormData, roleId }));
  }, []);

  const handleCourseChange = useCallback((event) => {
    const courseId = Number(event.target.value);
    setFormData((prevFormData) => ({ ...prevFormData, courseId }));
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const [rolesResponse, coursesResponse] = await Promise.all([
        axios.get('http://localhost:8081/roles/roles/get'),
        axios.get('http://localhost:8081/courses/courses/get')
      ]);

      const rolesData = rolesResponse.data.roles;
      setRoles(rolesData);

      const coursesData = coursesResponse.data.courses;
      setCourses(coursesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    const validationErrors = SignUpValidation(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost:8081/signup/signup', formData);

        if (response.status === 200) {
          console.log('Signup successful');
          setSuccessMessage('Signup successful');
          navigate('/');
          setFormData({
            name: '',
            email: '',
            password: '',
            courseId: '',
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

          <RoleDropdown
            roles={roles}
            roleId={formData.roleId}
            handleRoleChange={handleRoleChange}
            errors={errors}
          />
          <CourseDropdown
            courses={courses}
            courseId={formData.courseId}
            handleCourseChange={handleCourseChange}
            errors={errors}
          />

          <Button type="submit" fullWidth variant="contained" color="success">
            Sign up
          </Button>
          {successMessage && <Typography variant="body2" className="success-message">{successMessage}</Typography>}
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
