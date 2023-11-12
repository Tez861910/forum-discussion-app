import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Typography, Grid } from '@mui/material';
import Navbar from './nav-bar';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import './home.css';
import AdminCourses from '../admin/AdminCourses';
import AdminUsers from '../admin/AdminUsers';
import AdminRoles from '../admin/AdminRoles';
import UserProfile from './user-profile/user-profile';
import CourseEnrollmentModal from './course-enrollment-modal';

const Home = () => {
  const [roleId, setRoleId] = useState('');
  const [cookies, setCookie] = useCookies();
  const navigate = useNavigate();
  const [isUserProfileOpen, setUserProfileOpen] = useState(false);
  const [isEnrollmentModalOpen, setEnrollmentModalOpen] = useState(false);
  const [coursesEnrolled, setCoursesEnrolled] = useState(false);
  const [courseIds, setCourseIds] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeView, setActiveView] = useState('courses');

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

  const navigateToPath = (path) => {
    navigate(path);
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

  const handleUserProfileClick = () => {
    setUserProfileOpen(true);
  };

  const handleEnrollmentClick = () => {
    setEnrollmentModalOpen(true);
  };

  const handleLogout = () => {
    handleTokenRefresh();
    clearUserData();
  };

  const renderButtonsByRoleId = (roleId) => {
    switch (roleId) {
      case '1':
        return (
          <>
            <button onClick={() => handleViewChange('courses')} className="btn btn-primary my-3">
              Manage Courses
            </button>
            <button onClick={() => handleViewChange('users')} className="btn btn-primary my-3">
              Manage Users
            </button>
            <button onClick={() => handleViewChange('roles')} className="btn btn-primary my-3">
              Manage Roles
            </button>
          </>
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

  const handleViewChange = (view) => {
    setActiveView(view);
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'courses':
        return <AdminCourses />;
      case 'users':
        return <AdminUsers />;
      case 'roles':
        return <AdminRoles />;
      default:
        return <AdminCourses />;
    }
  };

  const getRoleHeaderText = (roleId) => {
    switch (roleId) {
      case '1':
        return 'Admin Home Panel';
      case '2':
        return 'Teacher Home Panel';
      case '3':
        return 'Student Home Panel';
      default:
        return 'Home Panel';
    }
  };

  return (
    <>
      <Container className="home-container">
        {/* Header for Admin, Teacher, and Student */}
        <Typography variant="h2" className="heading" style={{ textAlign: 'center', marginBottom: '20px' }}>
          {getRoleHeaderText(roleId)}
        </Typography>

        {/* Main Content Layout */}
        <Grid container className="main-container" spacing={3}>
          {/* Main Content Area */}
          <Grid item xs={12}>
            <div className="main-content">
              <Typography variant="h4" className="heading">
                Welcome, {roleId === '1' ? 'Admin' : roleId === '2' ? 'Teacher' : 'Student'}
              </Typography>

              {/* Navbar */}
              <div className="button-container">
              <Navbar
  renderButtonsByRoleId={renderButtonsByRoleId}
  onButtonClick={navigateToPath}
  roleId={roleId}
  handleUserProfileClick={handleUserProfileClick}
  handleEnrollmentClick={handleEnrollmentClick}
  handleLogout={handleLogout}
/>
              </div>

              {/* Admin-specific content */}
              {roleId === '1' && (
                <div className="admin-container">
                  {renderActiveView()}
                </div>
              )}
            </div>
          </Grid>
        </Grid>
        {/* User Profile Modal */}
        <UserProfile isOpen={isUserProfileOpen} onClose={() => setUserProfileOpen(false)} />

        {/* Course Enrollment Modal */}
        <CourseEnrollmentModal
          isOpen={isEnrollmentModalOpen}
          onRequestClose={() => setEnrollmentModalOpen(false)}
          onEnrollSuccess={handleEnrollmentSuccess}
          courses={courseIds}
        />
      </Container>
    </>
  );
};

export { Home };
