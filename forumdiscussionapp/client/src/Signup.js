import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SignUpValidation from './SignupValidation';
import axios from 'axios';
import { useError } from './ErrorHandling';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    courseId: '',
    roleId: '',
  });

  const [roles, setRoles] = useState([]);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const { setError } = useError();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get('http://localhost:8081/roles');
        setRoles(response.data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8081/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchRoles();
    fetchCourses();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    //Validate that a role is selected
    if (!formData.roleId) {
      setError('Please select a user role.');
      return;
    }
  
    const validationErrors = SignUpValidation(formData);
    setErrors(validationErrors);
  
    if (Object.keys(validationErrors).length === 0) {
      try {
        await axios.post('http://localhost:8081/auth/signup', formData);
        navigate('/');
      } catch (error) {
        console.error('Error signing up user:', error);
        setError('Signup failed. Please try again.');
      }
    }
  };
  

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Sign-Up</h2>
        <form onSubmit={handleSubmit}>
          {renderInput('name', 'User Name', 'text')}
          {renderInput('email', 'User Email', 'email')}
          {renderInput('password', 'Password', 'password')}
          <div className="mb-3">
            <label htmlFor="roleId">Select User Role</label>
            <select
              name="roleId"
              value={formData.roleId}
              onChange={handleInputChange}
              className="form-control rounded-0"
            >
              <option value="">Select a Role</option>
              {roles.map((role) => (
                <option key={role.RoleID} value={role.RoleID}>
                  {role.RoleName}
                </option>
              ))}
            </select>
            {errors.roleId && <span className="text-danger">{errors.roleId}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="courseId">Select User Course</label>
            <select
              name="courseId"
              value={formData.courseId}
              onChange={handleInputChange}
              className="form-control rounded-0"
            >
              <option value="">Select a Course</option>
              {courses.map((course) => (
                <option key={course.CourseID} value={course.CourseID}>
                  {course.CourseName}
                </option>
              ))}
            </select>
            {errors.courseId && <span className="text-danger">{errors.courseId}</span>}
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Sign up
          </button>
          <p>You agree to our terms and conditions</p>
          <Link to="/" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
            Login
          </Link>
        </form>
      </div>
    </div>
  );

  function renderInput(name, label, type) {
    return (
      <div className="mb-3">
        <label htmlFor={name}>{label}</label>
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          className="form-control rounded-0"
        />
        {errors[name] && <span className="text-danger">{errors[name]}</span>}
      </div>
    );
  }
};

export default Signup;
