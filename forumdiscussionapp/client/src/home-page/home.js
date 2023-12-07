import * as React from 'react';
import { useRoutes } from 'react-router-dom';
import { Container, Box, Paper, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie'; 
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

const Home = () => {
  const theme = useTheme();
  const [roleId, setRoleId] = React.useState('');
  const [userId,setUserId]=React.useState('');
  const [navigateToPathState, setNavigateToPath] = React.useState(null);
  const [isUserProfileOpen, setUserProfileOpen] = React.useState(false);
  const [isEnrollmentModalOpen, setEnrollmentModalOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [activeView, setActiveView] = React.useState('scheduler');
  const [selectedCourse, setSelectedCourse] = React.useState(null);
  const [isCoursesEnrolled, setIsCoursesEnrolled] = React.useState(false);
  const [userName, setUserName] = React.useState('');
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);
  
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(['token', 'refreshToken']); 

  const clearUserData = async () => {
    // Clear local storage
    localStorage.removeItem('userId');
    localStorage.removeItem('roleId');

    // Clear cookies
    removeCookie('token', { path: '/' }); 
    removeCookie('refreshToken', { path: '/' }); 
    console.log(`Token after removal: ${cookies.token}`);  

    // Update state
    setIsLoggedIn(false);

    // Redirect to login page
    navigate('/login');
  };  

  const handleRoleSpecificActions = (roleId) => {
    if (['1', '2', '3'].includes(roleId)) {
      setIsCoursesEnrolled(true);
    }
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


    if (navigateToPathState && roleId) {
      navigate(navigateToPathState);
      setNavigateToPath(null);
    }
  }, [ isLoggedIn, navigateToPathState, roleId,  navigate]);

  const handleDrawerToggle = () => {
    console.log('handleDrawerToggle triggered');
    setSidebarOpen(!isSidebarOpen);
    console.log('Sidebar open state:', isSidebarOpen);
  };

  const handleEnrollmentSuccess = () => {
    setEnrollmentModalOpen(false);
  };

  const handleLogout = () => {
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
  return (
    <Container sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ flexGrow: 1, p: 2, display: 'flex', flexDirection: 'column' }}>
        <Navbar
          userId={userId}
          roleId={roleId}
          selectedCourse={selectedCourse}
          isTeacherOrStudent={['2', '3'].includes(roleId)}
          onCourseSelect={handleCourseSelect}
          handleCourseChange={handleCourseChange}
          handleDrawerToggle={() => setSidebarOpen(!isSidebarOpen)}
          onButtonClick={(view) => {
            setActiveView(view);
            navigate(view, { replace: true });
          }}
        />
  
        <Paper elevation={3} sx={{ p: 2, flexGrow: 1, overflow: 'auto' }}>
          {routes}
        </Paper>
      </Box>
  
      <Box sx={{ display: 'flex', width: '100%', [theme.breakpoints.up('md')]: { maxWidth: 900 } }}>
        <Sidebar
          open={isSidebarOpen}
          handleDrawerToggle={() => setSidebarOpen(!isSidebarOpen)}
          key={isSidebarOpen} 
          isEnrollmentModalOpen={isEnrollmentModalOpen}
          setEnrollmentModalOpen={setEnrollmentModalOpen}
          handleEnrollmentSuccess={handleEnrollmentSuccess}
          handleLogout={handleLogout}
          isUserProfileOpen={isUserProfileOpen}
          setUserProfileOpen={setUserProfileOpen}
          userName={userName}
          roleId={roleId}
          isCoursesEnrolled={isCoursesEnrolled}
        />
      </Box>
  
      <UserProfile 
        isOpen={isUserProfileOpen} 
        onClose={() => setUserProfileOpen(false)}
        setUserName={setUserName}
      />
      <CourseEnrollmentModal
        isOpen={isEnrollmentModalOpen}
        onRequestClose={() => setEnrollmentModalOpen(false)}
        onEnrollSuccess={handleEnrollmentSuccess}
      />
    </Container>
  );
  
};

export default Home;