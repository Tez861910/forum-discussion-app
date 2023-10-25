import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useError } from './ErrorHandling';

function Home() {
  const [data, setData] = useState([]);
  const { error, setError, clearError } = useError();

  const handleAuth = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No access token found.');
      return;
    }

    const headers = {
      'access-token': token,
    };

    try {
      const response = await axios.get('http://localhost:8081/checkauth', { headers });

      if (response.status !== 200) {
        setError('An error occurred while checking authorization.');
        return;
      }

      // Handle successful response here
    } catch (err) {
      setError('An error occurred while checking authorization.');
    }
  }, [setError]);

  const handleDelete = (id) => {
    const shouldDelete = window.confirm('Do you want to delete this record?');
    if (shouldDelete) {
      axios.delete(`http://localhost:3000/users/${id}`)
        .then(() => {
          alert('Record Deleted');
          window.location.reload();
        });
    }
  };

  useEffect(() => {
    handleAuth();
    axios.get('http://localhost:3000/users')
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [handleAuth]);

  const userRole = localStorage.getItem('role'); 
  const assignedCourse = localStorage.getItem('course'); 

  return (
    <div className="container">
      {error && (
        <div className="error">
          {error}
          <button onClick={clearError}>Clear Error</button>
        </div>
      )}
      <h2>Home Panel</h2>
      {userRole === 'admin' && (
        <div>
          <Link to="/admin" className="btn btn-success my-3">
            Admin Panel
          </Link>
          <Link to="/create-course" className="btn btn-primary my-3">
            Create Course
          </Link>
        </div>
      )}
      {userRole === 'teacher' && (
        <div>
          <Link to="/create-thread" className="btn btn-primary my-3">
            Create Thread
          </Link>
        </div>
      )}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <td>{d.id}</td>
              <td>{d.name}</td>
              <td>{d.email}</td>
              <td>
                {userRole === 'admin' && (
                  <Link to={`/update/${d.id}`} className="btn btn-sm btn-success">
                    Update
                  </Link>
                )}
                {userRole === 'admin' && (
                  <button
                    className="btn btn-sm btn-danger mx-1"
                    onClick={() => handleDelete(d.id)}
                  >
                    Delete
                  </button>
                )}
                {userRole === 'student' && assignedCourse === d.courseId && (
                  <Link to={`/read/${d.id}`} className="btn btn-sm btn-primary">
                    Read
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
