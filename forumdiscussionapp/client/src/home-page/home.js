import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './home.css';
import UserProfile from '../user-profile/user-profile';
import { useCookies } from 'react-cookie';
import axios from'axios';

export function Home() {
  const [roleId, setRoleId] = useState('');
  const [cookies, setCookie] = useCookies();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove cookies
    setCookie('token', '', { path: '/', expires: new Date(0) });
  
    // Remove data from local storage
    localStorage.removeItem('userId');
    localStorage.removeItem('roleId'); 
    localStorage.removeItem('courseId');
  
    // Redirect to the login page
    navigate('/');
  };
  
  // Function to refresh the token
  const handleTokenRefresh = async () => {
    try {
      // Send a POST request to your backend's /refresh-token endpoint
      const response = await axios.post('http://your-backend-url/refresh-token');

      if (response.data.success) {
        const newAccessToken = response.data.accessToken;
        // Update the token cookie
        setCookie('token', newAccessToken, { path: '/' });
      } else {
        // Handle token refresh failure, e.g., log the user out
        handleLogout();
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      // Handle token refresh error, e.g., log the user out
      handleLogout();
    }
  };

  useEffect(() => {
    const storedRoleId = localStorage.getItem('roleId');
    setRoleId(storedRoleId);

    // If accessToken is not available or already expired, attempt to refresh it
    if (!cookies.token) {
      // Call the token refresh function
      handleTokenRefresh();
    }
  }, [cookies.token]);

  return (
    <div className="container">
      <h2>Home Panel</h2>

      <UserProfile />

      {roleId === '1' && (
        <Link to="/home/adminpanel" className="btn btn-success my-3">
          Admin Panel
        </Link>
      )}
      {roleId === '2' && (
        <>
          <Link to="/home/create-thread" className="btn btn-primary my-3">
            Create Thread
          </Link>
          <Link to="/home/mcq-form" className="btn btn-primary my-3">
            Create MCQ Question
          </Link>
        </>
      )}
      {roleId === '3' && (
        <>
          <Link to="/home/comment-section" className="btn btn-primary my-3">
            Comment Section
          </Link>
          <Link to="/home/mcqanswerform" className="btn btn-primary my-3">
            Answer MCQ Question
          </Link>
        </>
      )}

      <button onClick={handleLogout} className="btn btn-danger">
        Logout
      </button>
    </div>
  );
}

export default Home;
