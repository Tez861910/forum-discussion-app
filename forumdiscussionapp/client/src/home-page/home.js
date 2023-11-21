import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Grid, Button } from '@mui/material';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import './home.css';
import AdminCourses from '../admin/AdminCourses';
import AdminUsers from '../admin/AdminUsers';
import AdminRoles from '../admin/AdminRoles';
import UserProfile from './user-profile';
import CourseEnrollmentModal from './course-enrollment-modal';
import Sidebar from './side-bar';
import Navbar from './nav-bar';
import CreateThread from '../threads/create-thread';

const API_URL = 'http://localhost:8081/home/refresh-token';

const Home = () => {
  const [roleId, setRoleId] = useState('');
  const [cookies, setCookie] = useCookies();
  const [navigateToPathState, setNavigateToPath] = useState(null);
  const [isUserProfileOpen, setUserProfileOpen] = useState(false);
  const [isEnrollmentModalOpen, setEnrollmentModalOpen] = useState(false);
  const [coursesEnrolled, setCoursesEnrolled] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeView, setActiveView] = useState('courses');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isCoursesEnrolled, setIsCoursesEnrolled] = useState(false);
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
      setCoursesEnrolled(true);
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

  const fetchUserCourses = useCallback(async () => {
    try {
      const userId = localStorage.getItem('userId');

      if (!userId) {
        console.error('User ID not found in local storage');
        return [];
      }

      const response = await axios.get('http://localhost:8081/users/usercourses/get/id', {
        params: { userId: userId },
      });

      if (response.status === 200) {
        return response.data.userCourses;
      } else {
        console.error('Failed to fetch user courses:', response.status);
        return [];
      }
    } catch (error) {
      console.error('Error fetching user courses:', error);
      return [];
    }
  }, []);

  const fetchUserAndEnrolledCourses = async () => {
    try {
      console.log('Calling fetchUserCourses...');
      const userCoursesData = await fetchUserCourses();
      const enrolledCourseIds = userCoursesData.map((course) => course.CourseID);
      setEnrolledCourses(enrolledCourseIds);
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
    }
  };

  useEffect(() => {
    const storedRoleId = localStorage.getItem('roleId');
    if (storedRoleId) {
      setRoleId(storedRoleId);
    }

    const token = cookies.token;

    const handleTokenRefreshAndFetch = async () => {
      if (isLoggedIn && token) {
        await handleTokenRefresh();
        if (isLoggedIn) {
          await fetchUserAndEnrolledCourses(); // Await here
        }
      }

      if (navigateToPathState && roleId) {
        navigate(navigateToPathState);
        setNavigateToPath(null);
      }
    };

    handleTokenRefreshAndFetch();
  }, [cookies.token, isLoggedIn, navigateToPathState, roleId, setCookie, enrolledCourses, navigate, fetchUserCourses]);

  const navigateToPath = (path) => {
    if (!roleId) {
      setNavigateToPath(path);
    } else {
      navigate(path);
    }
  };

  const handleEnrollmentSuccess = () => {
    setCoursesEnrolled(true);
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

  const renderButtonsByRoleId = (roleId) => {
    switch (roleId) {
      case '1':
        return (
          <>
            <Button
              onClick={() => handleViewChange('courses')}
              variant="contained"
              sx={{ my: 3, width: '100%' }}
            >
              Manage Courses
            </Button>
            <Button
              onClick={() => handleViewChange('users')}
              variant="contained"
              sx={{ my: 3, width: '100%' }}
            >
              Manage Users
            </Button>
            <Button
              onClick={() => handleViewChange('roles')}
              variant="contained"
              sx={{ my: 3, width: '100%' }}
            >
              Manage Roles
            </Button>
          </>
        );
      case '2':
      case '3':
        return (
          <>
            <Button
              onClick={() => handleCourseSelect()}
              variant="contained"
              sx={{ my: 3, width: '100%' }}
            >
              Forum Discussion
            </Button>
            {renderCourseButtons()}
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
    if (roleId === '1') {
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
    } else if (['2', '3'].includes(roleId)) {
      if (selectedCourse) {
        return <CreateThread courseId={selectedCourse} />;
      } else {
        return (
          <Typography variant="h6" sx={{ my: 3 }}>
            Please select a course to access this feature.
          </Typography>
        );
      }
    } else {
      return <UserProfile />;
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

  const renderCourseButtons = () => {
    return enrolledCourses.map((course) => (
      <Button
        key={course.CourseID}
        variant="contained"
        onClick={() => handleCourseSelect(course.CourseID)}
        sx={{ my: 3, width: '100%' }}
      >
        {course.CourseName}
      </Button>
    ));
  };

  return (
    <>
      <Container className="home-container">
        <Typography variant="h2" sx={{ textAlign: 'center', my: 3 }}>
          {getRoleHeaderText(roleId)}
        </Typography>

        <Grid container className="main-container" spacing={3}>
          <Grid item xs={2}>
            <Sidebar
              isEnrollmentModalOpen={isEnrollmentModalOpen}
              enrolledCourses={enrolledCourses}
              setEnrollmentModalOpen={setEnrollmentModalOpen}
              handleEnrollmentSuccess={handleEnrollmentSuccess}
              handleLogout={handleLogout}
              setUserProfileOpen={setUserProfileOpen}
              handleCourseButtonClick={handleCourseSelect}
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
                  renderButtonsByRoleId={renderButtonsByRoleId}
                  roleId={roleId}
                  onCourseSelect={handleCourseSelect}
                  selectedCourse={selectedCourse}
                />
              </div>

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
