import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import RoleDropdown from './RoleDropdown';
import CourseDropdown from './CourseDropdown';
import SignUpValidation from './SignupValidation';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';

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
        axios.get('http://localhost:8081/roles/roles/all'),
        axios.get('http://localhost:8081/courses/courses/all')
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
    <div className="signup-page">
      <div className="form">
        <h2>Sign-Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name">User Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="form-control"
            />
            {errors.name && <span className="text-danger">{errors.name}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="email">User Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-control"
            />
            {errors.email && <span className="text-danger">{errors.email}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="form-control"
            />
            {errors.password && <span className="text-danger">{errors.password}</span>}
          </div>
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
          <button type="submit" className="btn btn-success w-100">
            Sign up
          </button>
          {successMessage && <p className="success-message">{successMessage}</p>}
          <p>You agree to our terms and conditions</p>
          <Link to="/" className="btn btn-default w-100">
            Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
