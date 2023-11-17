import React, { useState } from 'react';
import { Button, Modal } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import CourseEnrollmentModal from './course-enrollment-modal';
import UserProfile from './user-profile';
import './home.css';

const Sidebar = ({
  isEnrollmentModalOpen,
  setEnrollmentModalOpen,
  handleEnrollmentSuccess,
  enrolledCourses,
  handleLogout,
  userRole,
  setUserProfileOpen,
  handleCourseButtonClick,
}) => {
  const [isUserProfileOpen, setLocalUserProfileOpen] = useState(false);

  const handleUserProfileClick = () => {
    setLocalUserProfileOpen(true);
    setUserProfileOpen(true);
  };

  const renderCourseButtons = () => {
    return enrolledCourses.map((course) => (
      <Button
        key={course.CourseID}
        variant="contained"
        className="sidebar-button"
        onClick={() => handleCourseButtonClick(course.CourseID)}
        sx={{ mb: 2 }}
      >
        {course.CourseName}
      </Button>
    ));
  };

  return (
    <div className="sidebar-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <div className="sidebar-content">
        <Button
          variant="contained"
          className="sidebar-button"
          sx={{ mb: 2 }}
          onClick={handleUserProfileClick}
        >
          User Profile
        </Button>
        {userRole === '3' && (
          <>
            <Button
              onClick={() => setEnrollmentModalOpen(true)}
              variant="contained"
              className="sidebar-button"
              startIcon={<AddIcon />}
              sx={{ mb: 2 }}
            >
              Enroll Now
            </Button>
            {renderCourseButtons()}
          </>
        )}
        <Button
          onClick={handleLogout}
          variant="contained"
          className="sidebar-button"
          startIcon={<LogoutIcon />}
          sx={{ mb: 2 }}
        >
          Logout
        </Button>
      </div>
      <CourseEnrollmentModal
        isOpen={isEnrollmentModalOpen}
        onRequestClose={() => setEnrollmentModalOpen(false)}
        onEnrollSuccess={handleEnrollmentSuccess}
      />
      {/* User Profile Modal */}
      <Modal open={isUserProfileOpen} onClose={() => setLocalUserProfileOpen(false)}>
        <UserProfile onClose={() => setLocalUserProfileOpen(false)} />
      </Modal>
    </div>
  );
};

export default Sidebar;
