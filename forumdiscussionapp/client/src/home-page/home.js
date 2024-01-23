import * as React from "react";
import { useApi } from "./Api";
import { useRoutes, useNavigate } from "react-router-dom";
import { Container, Box, Paper, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Sidebar } from "./side-bar";
import { Navbar } from "./nav-bar";
import { AdminCourses } from "../admin/Courses/AdminCourses";
import { AdminUsers } from "../admin/Users/AdminUsers";
import { AdminRoles } from "../admin/Roles/AdminRoles";
import { MCQForm } from "../Examination/mcq-form";
import { MCQAnswerForm } from "../Examination/mcq-answer-form";
import { ForumDiscussion } from "../threads/Forumdiscussion";
import { Scheduler } from "../Event-Management/scheduler";
import { UserProfile } from "./user-profile";
import { CourseEnrollmentModal } from "./course-enrollment-modal";
import { ChatApplication } from "../chats/chat-application";
import { palette } from "../Theme/palette";

export const Home = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const [roleId, setRoleId] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const [refreshCourses, setRefreshCourses] = React.useState(false);
  const [navigateToPathState, setNavigateToPath] = React.useState(null);
  const [isUserProfileOpen, setUserProfileOpen] = React.useState(false);
  const [isEnrollmentModalOpen, setEnrollmentModalOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [activeView, setActiveView] = React.useState("scheduler");
  const [selectedCourse, setSelectedCourse] = React.useState(null);
  const [isCoursesEnrolled, setIsCoursesEnrolled] = React.useState(false);
  const [userName, setUserName] = React.useState("");
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);

  const navigate = useNavigate();
  const { api } = useApi();
  const logout = async () => {
    try {
      await api.post("/auth/home/logout", {});
      localStorage.removeItem("userId");
      localStorage.removeItem("roleId");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleRoleSpecificActions = (roleId) => {
    if (["1", "2", "3"].includes(roleId)) {
      setIsCoursesEnrolled(true);
    }
  };

  React.useEffect(() => {
    const storedRoleId = localStorage.getItem("roleId");
    if (storedRoleId) {
      setRoleId(storedRoleId);
      handleRoleSpecificActions(storedRoleId);

      switch (storedRoleId) {
        case "1":
          setActiveView("scheduler");
          break;
        case "2":
        case "3":
          setActiveView("scheduler");
          break;
        default:
          setActiveView("scheduler");
      }
    }

    if (navigateToPathState && roleId) {
      navigate(navigateToPathState);
      setNavigateToPath(null);
    }
  }, [isLoggedIn, navigateToPathState, roleId, navigate]);

  const handleDrawerToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleEnrollmentSuccess = () => {
    setEnrollmentModalOpen(false);
  };

  const handleLogout = () => {
    logout();
  };

  const handleCourseSelect = (courseId) => {
    setSelectedCourse(courseId);
    setEnrollmentModalOpen(false);
  };

  const handleCourseChange = (courseId) => {
    setSelectedCourse(courseId);
  };

  const handleEnrolledCoursesButtonClick = () => {
    setRefreshCourses((prev) => !prev);
  };

  const Wrapper = ({ component: Component, view }) => {
    React.useEffect(() => {
      setActiveView(view);
    }, [view]);

    return <Component selectedCourse={selectedCourse} />;
  };

  const routes = useRoutes([
    { path: "admin-courses", element: <AdminCourses /> },
    { path: "admin-roles", element: <AdminRoles /> },
    { path: "admin-users", element: <AdminUsers /> },
    {
      path: "scheduler",
      element: <Wrapper component={Scheduler} view="scheduler" />,
    },
    { path: "user-profile", element: <UserProfile /> },
    { path: "course-enrollment-modal", element: <CourseEnrollmentModal /> },
    {
      path: "forum-discussion",
      element: <Wrapper component={ForumDiscussion} view="forum-discussion" />,
    },
    {
      path: "mcq-form",
      element: <Wrapper component={MCQForm} view="mcq-form" />,
    },
    {
      path: "mcq-answer-form",
      element: <Wrapper component={MCQAnswerForm} view="mcq-answer-form" />,
    },
    { path: "chat", element: <ChatApplication /> },
  ]);

  return (
    <Container
      sx={{
        mt: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ flexGrow: 1, p: 2, display: "flex", flexDirection: "column" }}>
        <Navbar
          userId={userId}
          roleId={roleId}
          selectedCourse={selectedCourse}
          isTeacherOrStudent={["2", "3"].includes(roleId)}
          onCourseSelect={handleCourseSelect}
          handleCourseChange={handleCourseChange}
          handleDrawerToggle={() => setSidebarOpen(!isSidebarOpen)}
          onButtonClick={(view) => {
            setActiveView(view);
            navigate(view, { replace: true });
          }}
        />

        <Paper elevation={3} sx={{ p: 2, flexGrow: 1, overflow: "auto" }}>
          {routes}
        </Paper>
      </Box>

      <Box
        sx={{
          display: "flex",
          width: matches ? "100%" : "auto",
          [theme.breakpoints.up("md")]: { maxWidth: 900 },
        }}
      >
        <Sidebar
          open={isSidebarOpen}
          handleDrawerToggle={() => setSidebarOpen(!isSidebarOpen)}
          key={isSidebarOpen}
          isEnrollmentModalOpen={isEnrollmentModalOpen}
          setEnrollmentModalOpen={setEnrollmentModalOpen}
          handleEnrollmentSuccess={handleEnrollmentSuccess}
          handleLogout={handleLogout}
          isUserProfileOpen={isUserProfileOpen}
          setUserProfileOpen={setUserProfileOpen}
          userName={userName}
          roleId={roleId}
          isCoursesEnrolled={isCoursesEnrolled}
          palette={palette}
        />
      </Box>

      <UserProfile
        isOpen={isUserProfileOpen}
        onClose={() => setUserProfileOpen(false)}
        setUserName={setUserName}
      />
      <CourseEnrollmentModal
        isOpen={isEnrollmentModalOpen}
        onRequestClose={() => setEnrollmentModalOpen(false)}
        onEnrollSuccess={handleEnrollmentSuccess}
      />
    </Container>
  );
};
