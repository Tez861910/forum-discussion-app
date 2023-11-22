import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, CssBaseline } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Sidebar from './side-bar';
import Navbar from './nav-bar';
import Scheduler from './scheduler';
import UserProfile from './user-profile';
import CourseEnrollmentModal from './course-enrollment-modal';
import ForumDiscussion from '../threads/Forumdiscussion';
import AdminCourses from '../admin/AdminCourses';
import AdminUsers from '../admin/AdminUsers';
import AdminRoles from '../admin/AdminRoles';
import './home.css';

const API_URL = 'http://localhost:8081/home/refresh-token';

const Home = () => {
  const [roleId, setRoleId] = useState('');
  const [cookies, setCookie] = useCookies();
  const [navigateToPathState, setNavigateToPath] = useState(null);
  const [isUserProfileOpen, setUserProfileOpen] = useState(false);
  const [isEnrollmentModalOpen, setEnrollmentModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeView, setActiveView] = useState('courses');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isCoursesEnrolled, setIsCoursesEnrolled] = useState(false);
  const [isForumDiscussionVisible, setForumDiscussionVisible] = useState(false);
  const navigate = useNavigate();

  const clearUserData = async () => {
    await new Promise(resolve => setTimeout(resolve, 100));
    setCookie('token', '', { path: '/', expires: new Date(0) });
    localStorage.removeItem('userId');
    localStorage.removeItem('roleId');
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleTokenRefreshSuccess = (data) => {
    const newAccessToken = data.accessToken;
    setCookie('token', newAccessToken, { path: '/' });

    const storedRoleId = localStorage.getItem('roleId');
    setRoleId(storedRoleId);

    storedRoleId && handleRoleSpecificActions(storedRoleId);
  };

  const handleRoleSpecificActions = (roleId) => {
    if (['1', '2', '3'].includes(roleId)) {
      setIsCoursesEnrolled(true);
    }
  };

  const handleTokenRefresh = async () => {
    try {
      const response = await axios.post(
        API_URL,
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

  const handleTokenRefreshFailure = () => {
    clearUserData();
  };

  useEffect(() => {
    const storedRoleId = localStorage.getItem('roleId');
    if (storedRoleId) {
      setRoleId(storedRoleId);
      handleRoleSpecificActions(storedRoleId);
    }

    const token = cookies.token;

    const handleTokenRefreshAndFetch = async () => {
      if (isLoggedIn && token) {
        await handleTokenRefresh();
      }

      if (navigateToPathState && roleId) {
        navigate(navigateToPathState);
        setNavigateToPath(null);
      }
    };

    handleTokenRefreshAndFetch();
  }, [cookies.token, isLoggedIn, navigateToPathState, roleId, setCookie, navigate]);

  const navigateToPath = (path) => {
    if (!roleId) {
      setNavigateToPath(path);
    } else {
      navigate(path);
    }
  };

  const handleEnrollmentSuccess = () => {
    setEnrollmentModalOpen(false);
  };

  const handleLogout = () => {
    handleTokenRefresh();
    clearUserData();
  };

  const handleCourseSelect = (courseId) => {
    setSelectedCourse(courseId);
    setEnrollmentModalOpen(false);
  };

  const handleForumDiscussionButtonClick = () => {
    setForumDiscussionVisible(true);
  };

const renderActiveView = () => {
  const isAdmin = roleId === '1';
  const isTeacherOrStudent = ['2', '3'].includes(roleId);

  return (
    <div>
      <Scheduler roleId={roleId} userId={localStorage.getItem('userId')} />

      {isAdmin && activeView === 'courses' && <AdminCourses />}
      {isAdmin && activeView === 'users' && <AdminUsers />}
      {isAdmin && activeView === 'roles' && <AdminRoles />}

      {isTeacherOrStudent && selectedCourse && !isForumDiscussionVisible && (
        <Typography variant="h6" sx={{ my: 3 }}>
          Please select a course to access this feature.
        </Typography>
      )}

      {isTeacherOrStudent && selectedCourse && isForumDiscussionVisible && (
        <ForumDiscussion courseId={selectedCourse} />
      )}
    </div>
  );
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
      <CssBaseline />
      <Container>
        <Typography variant="h2" align="center" sx={{ my: 3 }}>
          {getRoleHeaderText(roleId)}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={2}>
            <Sidebar
              isEnrollmentModalOpen={isEnrollmentModalOpen}
              setEnrollmentModalOpen={setEnrollmentModalOpen}
              handleEnrollmentSuccess={handleEnrollmentSuccess}
              handleLogout={handleLogout}
              setUserProfileOpen={setUserProfileOpen}
              onCourseSelect={handleCourseSelect}
              roleId={roleId}
              isCoursesEnrolled={isCoursesEnrolled}
            />
          </Grid>

          <Grid item xs={10}>
            <div className="main-content">
              <Typography variant="h4" sx={{ my: 3 }}>
                Welcome, {roleId === '1' ? 'Admin' : roleId === '2' ? 'Teacher' : 'Student'}
              </Typography>

              <div className="button-container">
                <Navbar
                  renderButtonsByRoleId={renderActiveView}
                  roleId={roleId}
                  onCourseSelect={handleCourseSelect}
                  selectedCourse={selectedCourse}
                  onForumDiscussionButtonClick={handleForumDiscussionButtonClick}
                />
              </div>

              {/* Display the Scheduler component */}
              <Scheduler roleId={roleId} userId={localStorage.getItem('userId')} />

              {renderActiveView()}
            </div>
          </Grid>
        </Grid>

        <UserProfile isOpen={isUserProfileOpen} onClose={() => setUserProfileOpen(false)} />
        <CourseEnrollmentModal
          isOpen={isEnrollmentModalOpen}
          onRequestClose={() => setEnrollmentModalOpen(false)}
          onEnrollSuccess={handleEnrollmentSuccess}
        />
      </Container>
    </>
  );
};

export { Home };
