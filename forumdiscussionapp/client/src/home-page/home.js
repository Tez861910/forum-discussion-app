import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';
import UserProfile from '../user-profile/user-profile';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import CourseEnrollmentModal from './course-enrollment-modal';
import './home.css';

export function Home() {
  const [roleId, setRoleId] = useState('');
  const [cookies, setCookie] = useCookies();
  const navigate = useNavigate();
  const [isEnrollmentModalOpen, setEnrollmentModalOpen] = useState(false);
  const [coursesEnrolled, setCoursesEnrolled] = useState(false);
  const [courseIds, setCourseIds] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Retrieve roleId and userId from local storage
    const storedRoleId = localStorage.getItem('roleId');

    if (storedRoleId) {
      setRoleId(storedRoleId);
    }

    // Check if the user is logged in
    const token = cookies.token;

    // If the user is logged in, handle token refresh
    if (isLoggedIn && token) {
      handleTokenRefresh();
    }
  }, [cookies.token, isLoggedIn]);

  const handleLogout = () => {
    // Trigger token refresh during logout
    handleTokenRefresh();

    // Clear user data
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

      if (response.data.success) {
        const newAccessToken = response.data.accessToken;
        setCookie('token', newAccessToken, { path: '/' });

        const storedRoleId = localStorage.getItem('roleId');

        setRoleId(storedRoleId);

        if (storedRoleId) {
          if (storedRoleId === '1') {
            // Render UserProfile directly for admin
            setCoursesEnrolled(true);
          } else if (storedRoleId === '2') {
            // Teachers don't need to enroll, so set coursesEnrolled to true
            setCoursesEnrolled(true);
          } else if (storedRoleId === '3') {
            // Students
            if (!courseIds || courseIds.length === 0) {
              // If the user doesn't have courseIds, open the enrollment modal
              setEnrollmentModalOpen(true);
            } else {
              // Render UserProfile for students with available courses
              setCoursesEnrolled(true);
            }
          }
        } else {
          console.log('User does not have a role.');
        }
      } else {
        clearUserData();
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      clearUserData();
    }
  };

  const handleEnrollmentSuccess = (selectedCourses) => {
    localStorage.setItem('courseIds', JSON.stringify(selectedCourses));
    setCoursesEnrolled(true);
    setEnrollmentModalOpen(false);
  };

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
          </>);
      default:
        return null;
    }
  };

  const renderContent = () => {
    return (
      <div>
        <Typography variant="h4" className="heading">
          Welcome, {roleId === '1' ? 'Admin' : 'User'}
        </Typography>
        {roleId !== '1' && roleId !== '2' && (
          <Button onClick={() => setEnrollmentModalOpen(true)} variant="contained" color="primary" className="enroll-button">
            Enroll Now
          </Button>
        )}
        <UserProfile />
      </div>
    );
  };

  return (
    <Container maxWidth="sm" className="container">
      <Typography variant="h2" className="heading">
        Home Panel
      </Typography>
      {renderContent()}
      <div className="button-container">{renderButtonsByRoleId()}</div>
      <Button onClick={handleLogout} variant="contained" color="error" className="logout-button">
        Logout
      </Button>

      <CourseEnrollmentModal
        isOpen={isEnrollmentModalOpen}
        onRequestClose={() => setEnrollmentModalOpen(false)}
        onEnrollSuccess={handleEnrollmentSuccess}
        courses={courseIds} 
      />
    </Container>
  );
}

export default Home;
