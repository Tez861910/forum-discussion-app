import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Typography, Grid } from '@mui/material';
import Sidebar from './side-bar';
import Navbar from './nav-bar';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import './home.css';

const Home = () => {
  const [roleId, setRoleId] = useState('');
  const [cookies, setCookie] = useCookies();
  const navigate = useNavigate();
  const [isEnrollmentModalOpen, setEnrollmentModalOpen] = useState(false);
  const [coursesEnrolled, setCoursesEnrolled] = useState(false);
  const [courseIds, setCourseIds] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedRoleId = localStorage.getItem('roleId');
    if (storedRoleId) {
      setRoleId(storedRoleId);
    }

    const token = cookies.token;

    if (isLoggedIn && token) {
      handleTokenRefresh();
    }
  }, [cookies.token, isLoggedIn]);

  const handleLogout = () => {
    handleTokenRefresh();
    clearUserData();
  };

  const clearUserData = () => {
    setCookie('token', '', { path: '/', expires: new Date(0) });
    localStorage.removeItem('userId');
    localStorage.removeItem('roleId');
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleTokenRefresh = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8081/home/refresh-token',
        {},
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );

      response.data.success
        ? handleTokenRefreshSuccess(response.data)
        : handleTokenRefreshFailure();
    } catch (error) {
      console.error('Token refresh failed:', error);
      handleTokenRefreshFailure();
    }
  };

  const handleTokenRefreshSuccess = (data) => {
    const newAccessToken = data.accessToken;
    setCookie('token', newAccessToken, { path: '/' });

    const storedRoleId = localStorage.getItem('roleId');
    setRoleId(storedRoleId);

    storedRoleId && handleRoleSpecificActions(storedRoleId);
  };

  const handleRoleSpecificActions = (roleId) => {
    switch (roleId) {
      case '1':
      case '2':
        setCoursesEnrolled(true);
        break;
      case '3':
        handleStudentActions();
        break;
      default:
        break;
    }
  };

  const handleStudentActions = () => {
    (!courseIds || courseIds.length === 0)
      ? setEnrollmentModalOpen(true)
      : setCoursesEnrolled(true);
  };

  const handleTokenRefreshFailure = () => {
    clearUserData();
  };

  const handleEnrollmentSuccess = (selectedCourses) => {
    localStorage.setItem('courseIds', JSON.stringify(selectedCourses));
    setCoursesEnrolled(true);
    setEnrollmentModalOpen(false);
  };

  const renderButtonsByRoleId = (roleId) => {
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
            <Link to="/home/mcq-answer-form" className="btn btn-primary my-3">
              Answer MCQ Question
            </Link>
          </>
        );
      default:
        return null;
    }
  };

  const renderContent = () => (
    <Grid container className="content-container" spacing={3}>
      <Grid item xs={3}>
        <Sidebar
          isEnrollmentModalOpen={isEnrollmentModalOpen}
          setEnrollmentModalOpen={setEnrollmentModalOpen}
          handleEnrollmentSuccess={handleEnrollmentSuccess}
          courseIds={courseIds}
          handleLogout={handleLogout}
          userRole={roleId}
        />
      </Grid>
      <Grid item xs={9}>
        <div className="main-content">
          <Typography variant="h4" className="heading">
            Welcome, {roleId === '1' ? 'Admin' : roleId === '2' ? 'Teacher' : 'Student'}
          </Typography>
          <div className="button-container">
            <Navbar renderButtonsByRoleId={renderButtonsByRoleId} onButtonClick={(path) => navigate(path)} />
          </div>
        </div>
      </Grid>
    </Grid>
  );

  return (
    <>
      <Container className="home-container">
        <Typography variant="h2" className="heading" style={{ textAlign: 'center' }}>
          Home Panel
        </Typography>
        {renderContent()}
      </Container>
    </>
  );
};

export { Home };