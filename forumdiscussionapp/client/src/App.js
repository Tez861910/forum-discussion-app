import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route , Navigate } from 'react-router-dom';
import { ThemeProvider , CssBaseline } from '@mui/material';
import { ErrorBoundary } from 'react-error-boundary';
import { useCookies } from 'react-cookie';
import theme from './Theme/Theme'; 

const AdminCourses = React.lazy(() => import('./admin/Courses/AdminCourses'));
const AdminRoles = React.lazy(() => import('./admin/Roles/AdminRoles'));
const AdminUsers = React.lazy(() => import('./admin/Users/AdminUsers'));
const Scheduler = React.lazy(() => import('./home-page/scheduler'));
const UserProfile = React.lazy(() => import('./home-page/user-profile'));
const CourseEnrollmentModal = React.lazy(() => import('./home-page/course-enrollment-modal'));
const ForumDiscussion = React.lazy(() => import('./threads/Forumdiscussion'));
const CommentSection = React.lazy(() => import('./threads/comment-section'));
const MCQForm = React.lazy(() => import('./mcq-form/mcq-form'));
const MCQAnswerForm = React.lazy(() => import('./mcq-form/mcq-answer-form'));
const Home= React.lazy(() => import('./home-page/home'));
const Login = React.lazy(() => import('./login/login'));
const Start = React.lazy(() => import('./start/start'));
const Signup = React.lazy(() => import('./sign-up-page/sign-up'));


function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function RequireAuth({ children }) {
  const [cookies] = useCookies(['token']); 

  const isAuthenticated = Boolean(cookies.token);

  useEffect(() => {
  }, []); 

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
}

const App = () => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/home/*" element={<RequireAuth><Home /></RequireAuth>}>
              <Route path="admin-courses" element={<AdminCourses />} />
              <Route path="admin-roles" element={<AdminRoles />} />
              <Route path="admin-users" element={<AdminUsers />} />
              <Route path="scheduler" element={<Scheduler />} />
              <Route path="user-profile" element={<UserProfile />} />
              <Route path="course-enrollment-modal" element={<CourseEnrollmentModal />} />
              <Route path="forum-discussion" element={<ForumDiscussion />} />
              <Route path="comment-section" element={<CommentSection />} />
              <Route path="mcq-form" element={<MCQForm />} />
              <Route path="mcq-answer-form" element={<MCQAnswerForm />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  </ErrorBoundary>
);

export default App;
