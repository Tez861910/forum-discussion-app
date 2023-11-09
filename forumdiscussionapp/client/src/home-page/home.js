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
  const [courses, setCourses] = useState([]); // Store the courses

  const handleLogout = () => {
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
      const response = await axios.post('http://localhost:8081/home/refresh-token');

      if (response.data.success) {
        const newAccessToken = response.data.accessToken;
        setCookie('token', newAccessToken, { path: '/' });
        setCourses(response.data.courses); // Store the courses in the state
        // Check if there are available courses, then open the enrollment modal
        if (courses && courses.length > 0) {
          setEnrollmentModalOpen(true);
        }
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
    } else {
      if (roleId && (roleId === '2' || roleId === '3')) {
        setEnrollmentModalOpen(true);
      }
    }
  }, [cookies.token, roleId]);

  const handleEnrollmentSuccess = (selectedCourses) => {
    localStorage.setItem('courseId', JSON.stringify(selectedCourses));
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

  return (
    <Container maxWidth="sm" className="container">
      <Typography variant="h2" className="heading">
        Home Panel
      </Typography>
      {coursesEnrolled && <UserProfile />}
      <div className="button-container">{renderButtonsByRoleId()}</div>
      <Button onClick={handleLogout} variant="contained" color="error" className="logout-button">
        Logout
      </Button>

      <CourseEnrollmentModal
        isOpen={isEnrollmentModalOpen}
        onRequestClose={() => setEnrollmentModalOpen(false)}
        onEnrollSuccess={handleEnrollmentSuccess}
        courses={courses} // Pass the courses to the modal
      />
    </Container>
  );
}

export default Home;