import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Create() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    roleType: '', // Add a field for role type
    course: '', // Add a field for course
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3000/users', values)
      .then(() => {
        navigate('/');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="w-50 border bg-secondary text-white p-5">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter Name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter Email"
              value={values.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter Password"
              value={values.password}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="roleType">Role Type:</label>
            <input
              type="text"
              name="roleType"
              className="form-control"
              placeholder="Enter Role Type"
              value={values.roleType}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="course">Course:</label>
            <input
              type="text"
              name="course"
              className="form-control"
              placeholder="Enter Course"
              value={values.course}
              onChange={handleInputChange}
            />
          </div>
          <br />
          <button className="btn btn-info">Create User</button>
        </form>
      </div>
    </div>
  );
}

export default Create;
