import * as React from 'react';
import PropTypes from 'prop-types';
import { Button, Box, Stack,  Avatar, Typography, Drawer,  IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CourseEnrollmentModal from './course-enrollment-modal';
import UserProfile from './user-profile';
import EnrolledCoursesDropdown from './enrolled-courses-dropdown';
import AvatarUploadModal from './AvatarUploadModal'; 

const Sidebar = ({
  open,
  handleDrawerToggle,
  isEnrollmentModalOpen,
  setEnrollmentModalOpen,
  handleEnrollmentSuccess,
  handleLogout,
  setUserProfileOpen,
  onCourseSelect,
  roleId,
}) => {
  const [isUserProfileOpen, setLocalUserProfileOpen] = React.useState(false);
  const [isAvatarModalOpen, setAvatarModalOpen] = React.useState(false); 

  const handleUserProfileClick = () => {
    setLocalUserProfileOpen(true);
    setUserProfileOpen(true);
  };

  const handleEnrollNowClick = () => {
    if (roleId === '3') {
      setEnrollmentModalOpen(true);
    }
  };

  const handleCourseChange = (courseId) => {
    onCourseSelect(courseId);
  };

  const handleModalClose = () => {
    setLocalUserProfileOpen(false);
    setUserProfileOpen(false);
  };

  const handleAvatarClick = () => {
    setAvatarModalOpen(true); 
  };

  const handleAvatarModalClose = () => {
    setAvatarModalOpen(false); 
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ marginRight: '36px', ...(open && { display: 'none' }) }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        variant="permanent"
        open={open}
        onClose={handleDrawerToggle}
        sx={{
          display: { sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
        ModalProps={{
          keepMounted: true, 
        }}
      >
        <IconButton onClick={handleDrawerToggle}>
          <ChevronLeftIcon />
        </IconButton>
        <Box sx={{ p: 2 }}>
          <Stack spacing={2}>
            {/* User Avatar */}
            <Avatar sx={{ width: 56, height: 56, mb: 2 }} onClick={handleAvatarClick}>U</Avatar>

            {/* User Role */}
            <Typography variant="h6" gutterBottom component="div">
              {roleId === '1' ? 'Admin' : roleId === '2' ? 'Teacher' : 'Student'}
            </Typography>

            {/* Enrolled Courses Dropdown */}
            {roleId !== '1' && (
              <EnrolledCoursesDropdown
                onCourseSelect={onCourseSelect}
                onCourseChange={handleCourseChange}
              />
            )}

            {/* User Profile Button */}
            <Button
              variant="contained"
              fullWidth
              onClick={handleUserProfileClick}
            >
              User Profile
            </Button>

            {/* Enroll Now Button (only for role 3) */}
            {roleId === '3' && (
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
          </Stack>
        </Box>
      </Drawer>

      {/* Course Enrollment Modal */}
      <CourseEnrollmentModal
        isOpen={isEnrollmentModalOpen}
        onRequestClose={() => setEnrollmentModalOpen(false)}
        onEnrollSuccess={handleEnrollmentSuccess}
      />

      {/* User Profile Modal */}
      <UserProfile 
        open={isUserProfileOpen}
        onClose={handleModalClose} 
      />

      {/* Avatar Upload Modal */}
      <AvatarUploadModal
        isOpen={isAvatarModalOpen}
        onRequestClose={handleAvatarModalClose}
      />
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
  setUserProfileOpen: PropTypes.func.isRequired,
  onCourseSelect: PropTypes.func.isRequired,
  roleId: PropTypes.string.isRequired,
};

export default Sidebar;
