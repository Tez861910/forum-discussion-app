import React from 'react';
import UserProfile from '../user-profile/user-profile';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import CourseEnrollmentModal from './course-enrollment-modal';

const Sidebar = ({ isEnrollmentModalOpen, setEnrollmentModalOpen, handleEnrollmentSuccess, courseIds, handleLogout, userRole }) => {
  return (
    <div className="sidebar-container">
      <div className="sidebar-content">
        <UserProfile />
        {userRole === '3' && (
          <Button
            onClick={() => setEnrollmentModalOpen(true)}
            variant="contained"
            color="primary"
            className="sidebar-button"
            startIcon={<AddIcon />}
          >
            Enroll Now
          </Button>
        )}
        <Button
          onClick={handleLogout}
          variant="contained"
          color="error"
          className="sidebar-button"
          startIcon={<LogoutIcon />}
        >
          Logout
        </Button>
      </div>
      <CourseEnrollmentModal
        isOpen={isEnrollmentModalOpen}
        onRequestClose={() => setEnrollmentModalOpen(false)}
        onEnrollSuccess={handleEnrollmentSuccess}
        courses={courseIds}
      />
    </div>
  );
};

export default Sidebar;

