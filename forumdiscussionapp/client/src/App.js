import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login/login';
import Signup from './sign-up-page/sign-up';
import { ErrorProvider } from './error-handling';
import AdminPanel from './admin/AdminPanel';
import ForumDiscussion from './threads/Forumdiscussion';
import CommentSection from './threads/comment-section';
import MCQForm from './mcq-form/mcq-form';
import MCQAnswerForm from './mcq-form/mcq-answer-form';
import { Home } from './home-page/home';
import { ThemeProvider } from '@mui/system';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './Theme';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/sign-up" element={<Signup />} />
    <Route path="/home/adminpanel" element={<AdminPanel />} />
    <Route path="/home/forum-discussion" element={<ForumDiscussion />} />
    <Route path="/home/comment-section" element={<CommentSection />} />
    <Route path="/home/mcq-form" element={<MCQForm />} />
    <Route path="/home/mcq-answer-form" element={<MCQAnswerForm />} />
    <Route path="/home" element={<Home />} />
  </Routes>
);

const App = () => (
  <ErrorProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppRoutes />
      </Router>
    </ThemeProvider>
  </ErrorProvider>
);

export default App;
