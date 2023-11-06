import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './home.css';
import UserProfile from '../user-profile/user-profile';
import { useCookies } from 'react-cookie';
import axios from 'axios';

export function Home() {
  const [roleId, setRoleId] = useState('');
  const [cookies, setCookie] = useCookies();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data and log out
    clearUserData();
  };

  const clearUserData = () => {
    setCookie('token', '', { path: '/', expires: new Date(0) });
    localStorage.removeItem('userId');
    localStorage.removeItem('roleId');
    localStorage.removeItem('courseId');
    navigate('/');
  };

  const handleTokenRefresh = async () => {
    try {
      const response = await axios.post('http://localhost:8081/Login/refresh-token');

      if (response.data.success) {
        const newAccessToken = response.data.accessToken;
        setCookie('token', newAccessToken, { path: '/' });
      } else {
        clearUserData();
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      clearUserData();
    }
  };

  useEffect(() => {
    const storedRoleId = localStorage.getItem('roleId');
    setRoleId(storedRoleId);

    if (!cookies.token) {
      handleTokenRefresh();
    }
  }, [cookies.token]);

  const renderButtonsByRoleId = () => {
    switch (roleId) {
      case '1':
        return (
          <Link to="/home/adminpanel" className="btn btn-success my-3">
            Admin Panel
          </Link>
        );
      case '2':
        return (
          <>
            <Link to="/home/create-thread" className="btn btn-primary my-3">
              Create Thread
            </Link>
            <Link to="/home/mcq-form" className="btn btn-primary my-3">
              Create MCQ Question
            </Link>
          </>
        );
      case '3':
        return (
          <>
            <Link to="/home/comment-section" className="btn btn-primary my-3">
              Comment Section
            </Link>
            <Link to="/home/mcqanswerform" className="btn btn-primary my-3">
              Answer MCQ Question
            </Link>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <h2>Home Panel</h2>
      <UserProfile />
      {renderButtonsByRoleId()}
      <button onClick={handleLogout} className="btn btn-danger">
        Logout
      </button>
    </div>
  );
}

export default Home;
