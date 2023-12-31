import * as React from 'react';
import { useRoutes } from 'react-router-dom';
import { Container, Typography, Paper, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Sidebar from './side-bar';
import Navbar from './nav-bar';
import AdminCourses from '../admin/Courses/AdminCourses';
import AdminUsers from '../admin/Users/AdminUsers';
import AdminRoles from '../admin/Roles/AdminRoles';
import MCQForm from '../mcq-form/mcq-form';
import MCQAnswerForm from '../mcq-form/mcq-answer-form';
import ForumDiscussion from '../threads/Forumdiscussion';
import Scheduler from './scheduler';
import UserProfile from './user-profile';
import CourseEnrollmentModal from './course-enrollment-modal';

const API_URL = 'http://localhost:8081/home/refresh-token';

const Home = () => {
  const [roleId, setRoleId] = React.useState('');
  const [userId,setUserId]=React.useState('');
  const [cookies, setCookie] = useCookies();
  const [navigateToPathState, setNavigateToPath] = React.useState(null);
  const [isUserProfileOpen, setUserProfileOpen] = React.useState(false);
  const [isEnrollmentModalOpen, setEnrollmentModalOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [activeView, setActiveView] = React.useState('scheduler');
  const [selectedCourse, setSelectedCourse] = React.useState(null);
  const [isCoursesEnrolled, setIsCoursesEnrolled] = React.useState(false);
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);
  const navigate = useNavigate();

  const clearUserData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    setCookie('token', '', { path: '/login', expires: new Date(0) });
    localStorage.removeItem('userId');
    localStorage.removeItem('roleId');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const handleTokenRefreshSuccess = (data) => {
    const newAccessToken = data.accessToken;
    setCookie('token', newAccessToken, { path: '/login' });

    const storedRoleId = localStorage.getItem('roleId');
    setRoleId(storedRoleId);

    const storedUserId = localStorage.getItem('userId');
    setUserId(storedUserId);

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
      console.error(`Token refresh failed: ${error}`);
      handleTokenRefreshFailure();
    }
  };

  const handleTokenRefreshFailure = () => {
    clearUserData();
  };

  React.useEffect(() => {
    const storedRoleId = localStorage.getItem('roleId');
    if (storedRoleId) {
      setRoleId(storedRoleId);
      handleRoleSpecificActions(storedRoleId);

      switch (storedRoleId) {
        case '1':
          setActiveView('scheduler');
          break;
        case '2':
        case '3':
          setActiveView('scheduler');
          break;
        default:
          setActiveView('scheduler');
      }
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

  const handleDrawerToggle = () => {
    console.log('handleDrawerToggle triggered');
    setSidebarOpen(!isSidebarOpen);
    console.log('Sidebar open state:', isSidebarOpen);
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

  const handleCourseChange = (courseId) => {
    setSelectedCourse(courseId);
  };

  const Wrapper = ({ component: Component, view }) => {
    React.useEffect(() => {
      setActiveView(view);
    }, [view]);

    return <Component selectedCourse={selectedCourse} />;
  };

  const routes = useRoutes([
    { path: 'admin-courses', element: <AdminCourses /> },
    { path: 'admin-roles', element: <AdminRoles /> },
    { path: 'admin-users', element: <AdminUsers /> },
    { path: 'scheduler', element: <Wrapper component={Scheduler} view='scheduler' /> },
    { path: 'user-profile', element: <UserProfile /> },
    { path: 'course-enrollment-modal', element: <CourseEnrollmentModal /> },
    { path: 'forum-discussion', element: <Wrapper component={ForumDiscussion} view='forum-discussion' /> },
    { path: 'mcq-form', element: <Wrapper component={MCQForm} view='mcq-form' /> },
    { path: 'mcq-answer-form', element: <Wrapper component={MCQAnswerForm} view='mcq-answer-form' /> },
  ]);

  const getRoleHeaderText = (roleId) => {
    const roleTitles = {
      '1': 'Admin Home Panel',
      '2': 'Teacher Home Panel',
      '3': 'Student Home Panel',
    };
    return roleTitles[roleId] || 'Home Panel';
  };

  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h2" align="center" sx={{ my: 3 }}>
        {getRoleHeaderText(roleId)}
      </Typography>
  
      <Box sx={{ display: 'flex' }}>
        <Sidebar
          open={isSidebarOpen}
          handleDrawerToggle={handleDrawerToggle}
          key={isSidebarOpen} 
          isEnrollmentModalOpen={isEnrollmentModalOpen}
          setEnrollmentModalOpen={setEnrollmentModalOpen}
          handleEnrollmentSuccess={handleEnrollmentSuccess}
          handleLogout={handleLogout}
          isUserProfileOpen={isUserProfileOpen}
          setUserProfileOpen={setUserProfileOpen}
          roleId={roleId}
          isCoursesEnrolled={isCoursesEnrolled}
        />
        <Box sx={{ flexGrow: 1, p: 2 }}>
          <Typography variant="h4" sx={{ my: 3 }}>
            Welcome, {roleId === '1' ? 'Admin' : roleId === '2' ? 'Teacher' : 'Student'}
          </Typography>
  
          <Box sx={{ mb: 2 }}>
            <Navbar
              userId={userId}
              roleId={roleId}
              selectedCourse={selectedCourse}
              isTeacherOrStudent={['2', '3'].includes(roleId)}
              onCourseSelect={handleCourseSelect}
              handleCourseChange={handleCourseChange}
              onButtonClick={(view) => {
                setActiveView(view);
                navigate(view, { replace: true });
              }}
            />
          </Box>
  
          <Paper elevation={3} sx={{ p: 2 }}>
            {routes}
          </Paper>
        </Box>
      </Box>
  
      <UserProfile isOpen={isUserProfileOpen} onClose={() => setUserProfileOpen(false)} />
      <CourseEnrollmentModal
        isOpen={isEnrollmentModalOpen}
        onRequestClose={() => setEnrollmentModalOpen(false)}
        onEnrollSuccess={handleEnrollmentSuccess}
      />
    </Container>
  );
};

export default Home;
