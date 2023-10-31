import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TeacherDashboard from './TeacherDashboard';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import AdminPanel from './AdminPanel';
import CommentSection from './CommentSection';
import { ErrorProvider } from './ErrorHandling';
import AdminCourses from './AdminCourses';
import AdminThreads from './AdminThreads';
import AdminComments from './AdminComments';
import AdminUsers from './AdminUsers';
import MCQForm from './MCQForm';
import MCQAnswerForm from './MCQAnswerForm';

const App = () => (
  <ErrorProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />}>
          <Route index element={<HomeContent />} />
          <Route path="adminpanel" element={<AdminPanelContent />} />
          <Route path="TeacherDashboard" element={<TeacherDashboard />} />
          <Route path="commentsection" element={<CommentSection />} />
          <Route path="mcqform" element={<MCQForm />} />
          <Route path="mcqanswerform" element={<MCQAnswerForm />} />
        </Route>
      </Routes>
    </Router>
  </ErrorProvider>
);

const HomeContent = () => {
  const roleId = localStorage.getItem('roleId');
  console.log('User Role:', roleId);

  if (roleId === '1') {
    console.log('Navigating to admin panel');
    return <Navigate to="adminpanel" />;
  } else if (roleId === '2') {
    console.log('Navigating to TeacherDashboard and mcqform');
    return (
      <>
        <Navigate to="TeacherDashboard" />
        <Navigate to="mcqform" />
      </>
    );
  } else if (roleId === '3') {
    console.log('Navigating to commentsection and mcqanswerform');
    return (
      <>
        <Navigate to="commentsection" />
        <Navigate to="mcqanswerform" />
      </>
    );
  } else {
    console.log('Navigating to TeacherDashboard (default)');
    return <Navigate to="TeacherDashboard" />;
  }
};

const AdminPanelContent = () => (
  <AdminPanel>
    <Routes>
      <Route index element={<AdminPanel />} />
      <Route path="courses" element={<AdminCourses />} />
      <Route path="threads" element={<AdminThreads />} />
      <Route path="comments" element={<AdminComments />} />
      <Route path="users" element={<AdminUsers />} />
    </Routes>
  </AdminPanel>
);

export default App;
