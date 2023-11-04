import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login/login';
import Signup from './sign-up-page/sign-up';
import { ErrorProvider } from './error-handling';
import AdminPanel from './admin/AdminPanel';
import CreateThread from './threads/create-thread';
import CommentSection from './comments/comment-section';
import MCQForm from './mcq-form/mcq-form';
import MCQAnswerForm from './mcq-form/mcq-answer-form';
import { Home } from './home-page/home';


const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/sign-up" element={<Signup />} />
    <Route path="/home/adminpanel" element={<AdminPanel />} />
        <Route path="/home/create-thread" element={<CreateThread />} />
        <Route path="/home/comment-section" element={<CommentSection />} />
        <Route path="/home/mcq-form" element={<MCQForm />} />
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
