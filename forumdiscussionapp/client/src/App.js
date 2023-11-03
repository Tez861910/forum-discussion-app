import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './login';
import Signup from './Signup';
import { ErrorProvider } from './ErrorHandling';
import AdminPanel from './AdminPanel';
import CreateThread from './CreateThread';
import CommentSection from './CommentSection';
import MCQForm from './MCQForm';
import MCQAnswerForm from './MCQAnswerForm';
import AdminCourses from './AdminCourses';
import AdminThreads from './AdminThreads';
import AdminComments from './AdminComments';
import AdminUsers from './AdminUsers';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/home/adminpanel/courses" element={<AdminCourses />} />
    <Route path="/home/adminpanel/threads" element={<AdminThreads />} />
    <Route path="/home/adminpanel/comments" element={<AdminComments />} />
    <Route path="/home/adminpanel/users" element={<AdminUsers />} />
    <Route path="/home/adminpanel" element={<AdminPanel />} />
        <Route path="/home/createthread" element={<CreateThread />} />
        <Route path="/home/commentsection" element={<CommentSection />} />
        <Route path="/home/mcqform" element={<MCQForm />} />
        <Route path="/home/mcqanswerform" element={<MCQAnswerForm />} />
    <Route path="/home" element={<Home />}>

    </Route>
  </Routes>
);

const App = () => (
  <ErrorProvider>
    <Router>
      <AppRoutes />
    </Router>
  </ErrorProvider>
);


export default App;
