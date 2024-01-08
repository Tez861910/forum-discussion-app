import React, { Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { ErrorBoundary } from "react-error-boundary";
import { useCookies } from "react-cookie";
import { theme } from "./Theme/Theme";

import { AdminCourses } from "./admin/Courses/AdminCourses";
import { AdminRoles } from "./admin/Roles/AdminRoles";
import { AdminUsers } from "./admin/Users/AdminUsers";
import { Scheduler } from "./home-page/scheduler";
import { UserProfile } from "./home-page/user-profile";
import { CourseEnrollmentModal } from "./home-page/course-enrollment-modal";
import { ForumDiscussion } from "./threads/Forumdiscussion";
import { CommentSection } from "./threads/comment-section";
import { MCQForm } from "./Examination/mcq-form";
import { MCQAnswerForm } from "./Examination/mcq-answer-form";
import { Home } from "./home-page/home";
import { Login } from "./login/login";
import { Start } from "./start/start";
import { Signup } from "./sign-up-page/sign-up";

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
  const [cookies] = useCookies(["token"]);

  const isAuthenticated = Boolean(cookies.token);

  useEffect(() => {}, []);

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export const App = () => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route
              path="/home/*"
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            >
              <Route path="admin-courses" element={<AdminCourses />} />
              <Route path="admin-roles" element={<AdminRoles />} />
              <Route path="admin-users" element={<AdminUsers />} />
              <Route path="scheduler" element={<Scheduler />} />
              <Route path="user-profile" element={<UserProfile />} />
              <Route
                path="course-enrollment-modal"
                element={<CourseEnrollmentModal />}
              />
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
