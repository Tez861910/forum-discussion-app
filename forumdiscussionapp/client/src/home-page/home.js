import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, CssBaseline, Paper } from '@mui/material';
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

import './home.css';

const API_URL = 'http://localhost:8081/home/refresh-token';

const Home = () => {
  const [roleId, setRoleId] = useState('');
  const [cookies, setCookie] = useCookies();
  const [navigateToPathState, setNavigateToPath] = useState(null);
  const [isUserProfileOpen, setUserProfileOpen] = useState(false);
  const [isEnrollmentModalOpen, setEnrollmentModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeView, setActiveView] = useState('scheduler');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isCoursesEnrolled, setIsCoursesEnrolled] = useState(false);
  const [isForumDiscussionVisible, setForumDiscussionVisible] = useState(false);
  const navigate = useNavigate();

  const clearUserData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    setCookie('token', '', { path: '/login', expires: new Date(0) });
    localStorage.removeItem('userId');
    localStorage.removeItem('roleId');
    setIsLoggedIn(false);
    navigate('/');
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

  useEffect(() => {
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
    setActiveView(isForumDiscussionVisible ? 'scheduler' : 'forumDiscussion');
  };  

  const handleMCQFormButtonClick = () => {
    if (selectedCourse) {
      setActiveView('mcqform');
    }
  };

  const handleMCQAnswerFormButtonClick = () => {
    if (selectedCourse) {
      setActiveView('mcqanswerform');
    }
  };

  const handleSchedulerButtonClick = () => {
    setActiveView('scheduler');
  };

  const renderActiveView = () => {
    const isAdmin = roleId === '1';
    const isTeacherOrStudent = ['2', '3'].includes(roleId);
  
    return (
      <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
        {isAdmin && activeView === 'adminCourses' && <AdminCourses />}
        {isAdmin && activeView === 'adminUsers' && <AdminUsers />}
        {isAdmin && activeView === 'adminRoles' && <AdminRoles />}
  
        {isTeacherOrStudent && selectedCourse && isForumDiscussionVisible && activeView === 'forumDiscussion' && (
          <ForumDiscussion courseId={selectedCourse} />
        )}
  
        {isTeacherOrStudent && selectedCourse && activeView === 'mcqform' && (
          <MCQForm courseId={selectedCourse} />
        )}
  
        {isTeacherOrStudent && selectedCourse && activeView === 'mcqanswerform' && (
          <MCQAnswerForm courseId={selectedCourse} />
        )}
  
        {activeView === 'scheduler' && (
          <Scheduler roleId={roleId} userId={localStorage.getItem('userId')} />
        )}
      </Paper>
    );
  };
  

  const handleNavbarButtonClick = (view) => {
    setForumDiscussionVisible(view === 'forumDiscussion');
    setActiveView(view);
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
      <CssBaseline />
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
  );
};

export { Home };
