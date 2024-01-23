import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { ErrorBoundary } from "react-error-boundary";
import { theme } from "./Theme/Theme";
import { AuthProvider } from "./utils/auth";
import { ProtectedRoute } from "./utils/protected-routes";
import { Start } from "./start/start";
import { Login } from "./login/login";
import { Signup } from "./sign-up-page/sign-up";
import { Home } from "./home-page/home";
import { AdminCourses } from "./admin/Courses/AdminCourses";
import { AdminRoles } from "./admin/Roles/AdminRoles";
import { AdminUsers } from "./admin/Users/AdminUsers";
import { Scheduler } from "./Event-Management/scheduler";
import { UserProfile } from "./home-page/user-profile";
import { CourseEnrollmentModal } from "./home-page/course-enrollment-modal";
import { ForumDiscussion } from "./threads/Forumdiscussion";
import { ExamForm } from "./Examination/exam-form";
import { MCQAnswerForm } from "./Examination/mcq-answer-form";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

export const App = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Router>
            <React.Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<Start />} />
                <Route path="/login" element={<Login />} />
                <Route path="/sign-up" element={<Signup />} />
                <Route
                  path="/home/*"
                  element={<ProtectedRoute component={Home} />}
                />
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
                <Route path="exam-form" element={<ExamForm />} />
                <Route path="mcq-answer-form" element={<MCQAnswerForm />} />
              </Routes>
            </React.Suspense>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};
