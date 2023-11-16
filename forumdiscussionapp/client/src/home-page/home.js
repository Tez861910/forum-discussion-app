import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Grid, Button } from '@mui/material';
import Navbar from './nav-bar';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import './home.css';
import AdminCourses from '../admin/AdminCourses';
import AdminUsers from '../admin/AdminUsers';
import AdminRoles from '../admin/AdminRoles';
import UserProfile from './user-profile';
import CourseEnrollmentModal, { fetchUserCourses } from './course-enrollment-modal';
import Sidebar from './side-bar';
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
  const navigate = useNavigate();

  const fetchUserAndEnrolledCourses = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('User ID not found in local storage');
        return;
      }

      const userCoursesData = await fetchUserCourses();

      const enrolledCourseIds = userCoursesData.map((course) => course.CourseID);

      setEnrolledCourses(enrolledCourseIds);
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
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
    if (!enrolledCourses || enrolledCourses.length === 0) {
      setEnrollmentModalOpen(true);
    } else {
      setCoursesEnrolled(true);
    }
  };

  const handleTokenRefreshFailure = () => {
    clearUserData();
  };

  useEffect(() => {
    const storedRoleId = localStorage.getItem('roleId');
    if (storedRoleId) {
      setRoleId(storedRoleId);
    }

    const token = cookies.token;

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
      if (!enrolledCourses || enrolledCourses.length === 0) {
        setEnrollmentModalOpen(true);
      } else {
        setCoursesEnrolled(true);
      }
    };

    const handleTokenRefreshFailure = () => {
      clearUserData();
    };

    if (isLoggedIn && token) {
      handleTokenRefresh();
      fetchUserAndEnrolledCourses();
    }

    if (navigateToPathState && roleId) {
      navigate(navigateToPathState);
      setNavigateToPath(null);
    }
  }, [cookies.token, isLoggedIn, navigateToPathState, roleId, setCookie, enrolledCourses, navigate]);

  const navigateToPath = (path) => {
    if (!roleId) {
      setNavigateToPath(path);
    } else {
      navigate(path);
    }
  };

  const clearUserData = () => {
    setCookie('token', '', { path: '/', expires: new Date(0) });
    localStorage.removeItem('userId');
    localStorage.removeItem('roleId');
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleEnrollmentSuccess = (selectedCourses) => {
    localStorage.setItem('courseIds', JSON.stringify(selectedCourses));
    setCoursesEnrolled(true);
    setEnrollmentModalOpen(false);
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
            <Button
              onClick={() => handleViewChange('courses')}
              variant="contained"
              className="btn btn-primary my-3"
            >
              Manage Courses
            </Button>
            <Button
              onClick={() => handleViewChange('users')}
              variant="contained"
              className="btn btn-primary my-3"
            >
              Manage Users
            </Button>
            <Button
              onClick={() => handleViewChange('roles')}
              variant="contained"
              className="btn btn-primary my-3"
            >
              Manage Roles
            </Button>
          </>
        );
      case '2':
      case '3':
        return (
          <>
            <div className="dropdown">
              <button className="btn btn-primary my-3 dropbtn">Enrolled Courses</button>
              <div className="dropdown-content">
                {enrolledCourses.map((course) => (
                  <button
                    key={course.CourseID}
                    onClick={() => handleViewChange(`create-thread/${course.CourseID}`)}
                  >
                    {course.CourseName}
                  </button>
                ))}
              </div>
            </div>
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
    } else if (roleId === '2' || roleId === '3') {
      if (coursesEnrolled) {
        return <CreateThread />;
      } else {
        return (
          <Typography variant="h6" className="heading">
            Please enroll in courses to access this feature.
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

  return (
    <>
      <Container className="home-container">
        <Typography variant="h2" className="heading" style={{ textAlign: 'center', marginBottom: '20px' }}>
          {getRoleHeaderText(roleId)}
        </Typography>

        <Grid container className="main-container" spacing={3}>
          <Grid item xs={2}>
            <Sidebar
              isEnrollmentModalOpen={isEnrollmentModalOpen}
              setEnrollmentModalOpen={setEnrollmentModalOpen}
              handleEnrollmentSuccess={handleEnrollmentSuccess}
              enrolledCourses={enrolledCourses}
              handleLogout={handleLogout}
              userRole={roleId}
              setUserProfileOpen={setUserProfileOpen}
            />
          </Grid>

          <Grid item xs={10}>
            <div className="main-content">
              <Typography variant="h4" className="heading">
                Welcome, {roleId === '1' ? 'Admin' : roleId === '2' ? 'Teacher' : 'Student'}
              </Typography>

              <div className="button-container">
                <Navbar
                  renderButtonsByRoleId={renderButtonsByRoleId}
                  onCourseSelect={(courseId) => console.log('Course Selected:', courseId)}
                  roleId={roleId}
                  enrolledCourses={enrolledCourses}
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
          fetchUserCourses={fetchUserCourses}
        />
      </Container>
    </>
  );
};

export { Home };
