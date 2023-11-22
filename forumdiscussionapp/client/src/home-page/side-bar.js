import React, { useState } from 'react';
import { Button, Modal, Toolbar, Box } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import CourseEnrollmentModal from './course-enrollment-modal';
import UserProfile from './user-profile';
import EnrolledCoursesDropdown from './enrolled-courses-dropdown';

const Sidebar = ({
  isEnrollmentModalOpen,
  setEnrollmentModalOpen,
  handleEnrollmentSuccess,
  handleLogout,
  setUserProfileOpen,
  onCourseSelect,
  roleId,
}) => {
  const [isUserProfileOpen, setLocalUserProfileOpen] = useState(false);

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

  return (
    <Box className="sidebar-container">
      <Toolbar />

      <Box className="sidebar-content">
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
          className="sidebar-button"
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
            className="sidebar-button"
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
          className="sidebar-button"
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
      <Modal open={isUserProfileOpen} onClose={handleModalClose}>
        <UserProfile onClose={handleModalClose} />
      </Modal>
    </Box>
  );
};

export default Sidebar;
