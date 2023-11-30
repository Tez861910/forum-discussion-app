import * as React from 'react';
import { useRoutes } from 'react-router-dom';
import { Container, Typography,  Paper , Box, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Sidebar from './side-bar';
import Navbar from './nav-bar';
import AdminCourses from '../admin/AdminCourses';
import AdminUsers from '../admin/AdminUsers';
import AdminRoles from '../admin/AdminRoles';
import MCQForm from '../mcq-form/mcq-form';
import MCQAnswerForm from '../mcq-form/mcq-answer-form';
import ForumDiscussion from '../threads/Forumdiscussion';
import Scheduler from './scheduler';
import UserProfile from './user-profile';
import CourseEnrollmentModal from './course-enrollment-modal';

//import './home.css';

const API_URL = 'http://localhost:8081/home/refresh-token';

const Home = () => {
  const [roleId, setRoleId] = React.useState('');
  const [cookies, setCookie] = useCookies();
  const [navigateToPathState, setNavigateToPath] = React.useState(null);
  const [isUserProfileOpen, setUserProfileOpen] = React.useState(false);
  const [isEnrollmentModalOpen, setEnrollmentModalOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [activeView, setActiveView] = React.useState('scheduler');
  const [selectedCourse, setSelectedCourse] = React.useState(null);
  const [isCoursesEnrolled, setIsCoursesEnrolled] = React.useState(false);
  const [isForumDiscussionVisible, setForumDiscussionVisible] = React.useState(false);
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
    setForumDiscussionVisible(!isForumDiscussionVisible);
    setActiveView(isForumDiscussionVisible ? 'scheduler' : 'forum-discussion');
  }; 

  const handleMCQFormButtonClick = () => {
    if (selectedCourse) {
      setActiveView('mcq-form');
    }
  };

  const handleMCQAnswerFormButtonClick = () => {
    if (selectedCourse) {
      setActiveView('mcq-answer-form');
    }
  };

  const handleSchedulerButtonClick = () => {
    setActiveView('scheduler');
  };

  const routes = useRoutes([
    { path: 'admin-courses', element: <AdminCourses /> },
    { path: 'admin-roles', element: <AdminRoles /> },
    { path: 'admin-users', element: <AdminUsers /> },
    { path: 'scheduler', element: <Scheduler /> },
    { path: 'user-profile', element: <UserProfile /> },
    { path: 'course-enrollment-modal', element: <CourseEnrollmentModal /> },
    { path: 'forum-discussion', element: <ForumDiscussion /> },
    { path: 'mcq-form', element: <MCQForm /> },
    { path: 'mcq-answer-form', element: <MCQAnswerForm /> },
  ]);

  const handleNavbarButtonClick = (view) => {
    setForumDiscussionVisible(view === 'forum-discussion');
    setActiveView(view);
    navigate(view, { replace: true });
  };
  
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

      <Stack direction="row" spacing={3}>
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

        <Box sx={{ width: '100%', p: 2 }}>
          <Typography variant="h4" sx={{ my: 3 }}>
            Welcome, {roleId === '1' ? 'Admin' : roleId === '2' ? 'Teacher' : 'Student'}
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Navbar
              onButtonClick={handleNavbarButtonClick}
              roleId={roleId}
              onCourseSelect={handleCourseSelect}
              selectedCourse={selectedCourse}
              onForumDiscussionButtonClick={handleForumDiscussionButtonClick}
              isTeacherOrStudent={['2', '3'].includes(roleId)}
              onMCQFormButtonClick={handleMCQFormButtonClick}
              onMCQAnswerFormButtonClick={handleMCQAnswerFormButtonClick}
              onSchedulerButtonClick={handleSchedulerButtonClick} 
            />
          </Box>

          <Paper elevation={3} sx={{ p: 2 }}>
            {routes}
          </Paper>
        </Box>
      </Stack>

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
