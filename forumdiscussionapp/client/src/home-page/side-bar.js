import * as React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Box,
  Avatar,
  Typography,
  Drawer,
  IconButton,
  AppBar,
  Toolbar,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { CourseEnrollmentModal } from "./course-enrollment-modal";
import { UserProfile } from "./user-profile";
import { AvatarUploadModal } from "./AvatarUploadModal";

export const Sidebar = ({
  open,
  handleDrawerToggle,
  isEnrollmentModalOpen,
  setEnrollmentModalOpen,
  handleEnrollmentSuccess,
  handleLogout,
  isUserProfileOpen,
  setUserProfileOpen,
  userName,
  roleId,
  palette,
}) => {
  const theme = useTheme();
  const [themeMode, setThemeMode] = React.useState("default");
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const [isAvatarModalOpen, setAvatarModalOpen] = React.useState(false);

  const handleThemeChange = () => {
    const themeModes = ["default", "light", "dark"];
    const currentThemeIndex = themeModes.indexOf(themeMode);
    const nextThemeIndex = (currentThemeIndex + 1) % themeModes.length;
    const nextThemeMode = themeModes[nextThemeIndex];
    setThemeMode(nextThemeMode);
  };

  const handleUserProfileClick = () => {
    setUserProfileOpen(true);
  };

  const handleEnrollNowClick = () => {
    if (roleId === "3") {
      setEnrollmentModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setUserProfileOpen(false);
  };

  const handleAvatarClick = () => {
    setAvatarModalOpen(true);
  };

  const handleAvatarModalClose = () => {
    setAvatarModalOpen(false);
  };

  const getRoleName = (roleId) => {
    const roleNames = {
      1: "Admin",
      2: "Teacher",
      3: "Student",
    };
    return roleNames[roleId] || "User";
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant={matches ? "persistent" : "temporary"}
        anchor="left"
        open={open}
        onClose={handleDrawerToggle}
        sx={{
          display: { sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 240,
            bgcolor: "background.default",
          },
        }}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              Menu
            </Typography>
            <IconButton
              onClick={handleDrawerToggle}
              sx={{ color: "contrastPrimary" }}
            >
              <ChevronLeftIcon />
            </IconButton>
            <IconButton
              onClick={handleThemeChange}
              sx={{ color: "contrastSecondary" }}
            >
              <Brightness4Icon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          {/* User Avatar */}
          <Avatar
            sx={{ width: 56, height: 56, alignSelf: "center" }}
            onClick={handleAvatarClick}
          >
            {userName ? userName[0].toUpperCase() : "U"}
          </Avatar>

          {/* User Role */}
          <Typography variant="h6" gutterBottom component="div" align="center">
            Welcome, {getRoleName(roleId)}
          </Typography>

          {/* User Profile Button */}
          <Button
            variant="contained"
            fullWidth
            onClick={handleUserProfileClick}
          >
            User Profile
          </Button>

          {/* Enroll Now Button (only for role 3) */}
          {roleId === "3" && (
            <Button
              fullWidth
              onClick={handleEnrollNowClick}
              variant="contained"
              startIcon={<AddIcon />}
            >
              Enroll Now
            </Button>
          )}

          {/* Logout Button */}
          <Button
            fullWidth
            onClick={handleLogout}
            variant="contained"
            startIcon={<LogoutIcon />}
          >
            Logout
          </Button>
        </Box>
        {/* Course Enrollment Modal */}
        <CourseEnrollmentModal
          isOpen={isEnrollmentModalOpen}
          onRequestClose={() => setEnrollmentModalOpen(false)}
          onEnrollSuccess={handleEnrollmentSuccess}
        />

        {/* User Profile Modal */}
        <UserProfile isOpen={isUserProfileOpen} onClose={handleModalClose} />

        {/* Avatar Upload Modal */}
        <AvatarUploadModal
          isOpen={isAvatarModalOpen}
          onRequestClose={handleAvatarModalClose}
        />
      </Drawer>
    </Box>
  );
};

Sidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
  isEnrollmentModalOpen: PropTypes.bool.isRequired,
  setEnrollmentModalOpen: PropTypes.func.isRequired,
  handleEnrollmentSuccess: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  isUserProfileOpen: PropTypes.bool.isRequired,
  setUserProfileOpen: PropTypes.func.isRequired,
  roleId: PropTypes.string.isRequired,
  palette: PropTypes.object.isRequired,
};
