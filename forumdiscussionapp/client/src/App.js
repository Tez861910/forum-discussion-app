import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { ErrorProvider } from './error-handling';
import AdminPanel from './admin/AdminPanel';
import ForumDiscussion from './threads/Forumdiscussion';
import CommentSection from './threads/comment-section';
import MCQForm from './mcq-form/mcq-form';
import MCQAnswerForm from './mcq-form/mcq-answer-form';
import { Home } from './home-page/home';
import theme from './Theme';
import Login from './login/login';
import Start from './start';
import Signup from './sign-up-page/sign-up';

class ErrorBoundary extends React.Component {
  constructor(props) {

    super(props);
    this.state = { hasError: false };
    
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

function logErrorToMyService(error, errorInfo) {
  // log the error to your error tracking service
  console.error("Error captured by error boundary:", error, errorInfo);
}

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Start/>} />
    <Route path="/login" element={<Login />} />
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
  <ErrorBoundary>
    <ErrorProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <AppRoutes />
        </Router>
      </ThemeProvider>
    </ErrorProvider>
  </ErrorBoundary>
);

export default App;
