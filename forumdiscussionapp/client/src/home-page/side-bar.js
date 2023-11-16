import React, { useState } from 'react';
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import CourseEnrollmentModal from './course-enrollment-modal';
import UserProfile from './user-profile'; 
import './home.css';

const Sidebar = ({ isEnrollmentModalOpen, setEnrollmentModalOpen, handleEnrollmentSuccess, courseIds, handleLogout, userRole, setUserProfileOpen }) => {
  const [isUserProfileOpen, setLocalUserProfileOpen] = useState(false);

  const handleUserProfileClick = () => {
    setLocalUserProfileOpen(true);
    setUserProfileOpen(true);
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
          <Button
            onClick={() => setEnrollmentModalOpen(true)}
            variant="contained"
            className="sidebar-button"
            startIcon={<AddIcon />}
            sx={{ mb: 2 }} 
          >
            Enroll Now
          </Button>
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
        courses={courseIds}
      />
      {/* User Profile Modal */}
      <UserProfile isOpen={isUserProfileOpen} onClose={() => setLocalUserProfileOpen(false)} />
    </div>
  );
};

export default Sidebar;
