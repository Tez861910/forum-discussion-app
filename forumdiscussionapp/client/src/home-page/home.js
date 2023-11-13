import React, { useState, useEffect} from 'react';
import { useNavigate ,Link} from 'react-router-dom';
import { Container, Typography, Grid, Button } from '@mui/material';
import Navbar from './nav-bar';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import './home.css';
import AdminCourses from '../admin/AdminCourses';
import AdminUsers from '../admin/AdminUsers';
import AdminRoles from '../admin/AdminRoles';
import UserProfile from './user-profile';
import CourseEnrollmentModal from './course-enrollment-modal';
import Sidebar from './side-bar';
import CommentSection from '../comments/comment-section';
import CreateThread from '../threads/create-thread';

const API_URL = 'http://localhost:8081/home/refresh-token';

const Home = () => {
  const [roleId, setRoleId] = useState('');
  const [cookies, setCookie] = useCookies();
  const [navigateToPathState, setNavigateToPath] = useState(null);
  const [isUserProfileOpen, setUserProfileOpen] = useState(false);
  const [isEnrollmentModalOpen, setEnrollmentModalOpen] = useState(false);
  const [coursesEnrolled, setCoursesEnrolled] = useState(false);
  const [courseIds, setCourseIds] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeView, setActiveView] = useState('courses');
  const navigate = useNavigate(); 

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

  useEffect(() => {
    if (navigateToPathState && roleId) {
      navigate(navigateToPathState);
      setNavigateToPath(null);
    }
  }, [navigateToPathState, roleId, navigate]);

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
    if (!courseIds || courseIds.length === 0) {
      setEnrollmentModalOpen(true);
    } else {
      setCoursesEnrolled(true);
    }
  };

  const handleTokenRefreshFailure = () => {
    clearUserData();
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
            <Button onClick={() => handleViewChange('courses')} variant="contained" className="btn btn-primary my-3">
              Manage Courses
            </Button>
            <Button onClick={() => handleViewChange('users')} variant="contained" className="btn btn-primary my-3">
              Manage Users
            </Button>
            <Button onClick={() => handleViewChange('roles')} variant="contained" className="btn btn-primary my-3">
              Manage Roles
            </Button>
          </>
        );
      case '2':
        return (
          <>
            <Link to="/home/create-thread" className="btn btn-primary my-3">
              Create Thread
            </Link>
          </>
        );
      case '3':
        return (
          <>
            <Link to="/home/comment-section" className="btn btn-primary my-3">
              Comment Section
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
    if (roleId === '1') { 
      switch (activeView) {
        case 'courses':
          return <AdminCourses />;
        case 'users':
          return <AdminUsers />;
        case 'roles':
          return <AdminRoles />;
        case 'comments':
          return <AdminCourses />;
        default:
          return <AdminCourses />;
      }
    } else if (roleId === '2') { 
      switch (activeView) {
        case 'create-thread':
          return <CreateThread />;
        default:
          return <CreateThread />;
      }
    } else if (roleId === '3') { 
      switch (activeView) {
       
        case 'Comment-Section':
          return <CommentSection />; 
        default:
          return <CommentSection />;
      }
    } else {
      return <UserProfile/>;
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
          {/* Sidebar */}
          <Grid item xs={2}>
            <Sidebar
              isEnrollmentModalOpen={isEnrollmentModalOpen}
              setEnrollmentModalOpen={setEnrollmentModalOpen}
              handleEnrollmentSuccess={handleEnrollmentSuccess}
              courseIds={courseIds}
              handleLogout={handleLogout}
              userRole={roleId}
            />
          </Grid>

          {/* Main Content Area */}
          <Grid item xs={10}>
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
                />
              </div>

              {renderActiveView()}
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