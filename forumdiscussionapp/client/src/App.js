import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { ErrorBoundary } from 'react-error-boundary';
import theme from './Theme'; 
const AdminCourses = React.lazy(() => import('./admin/AdminCourses'));
const AdminRoles = React.lazy(() => import('./admin/AdminRoles'));
const AdminUsers = React.lazy(() => import('./admin/AdminUsers'));
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

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Start />} />
    <Route path="/login" element={<Login />} />
    <Route path="/sign-up" element={<Signup />} />
    <Route path="/home/*" element={<Home />}>
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
);

const App = () => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <ThemeProvider theme={theme}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <AppRoutes />
        </Suspense>
      </Router>
    </ThemeProvider>
  </ErrorBoundary>
);

export default App;
