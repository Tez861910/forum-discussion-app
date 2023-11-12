import React, { useState } from 'react';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import CourseEnrollmentModal from './course-enrollment-modal';
import UserProfile from './user-profile/user-profile';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const Sidebar = ({ isEnrollmentModalOpen, setEnrollmentModalOpen, handleEnrollmentSuccess, courseIds, handleLogout, userRole }) => {
  const [isUserProfileOpen, setUserProfileOpen] = useState(false);

  const handleUserProfileClick = () => {
    setUserProfileOpen(true);
  };

  const closeUserProfileModal = () => {
    setUserProfileOpen(false);
  };

  return (
    <div className="sidebar-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <div className="sidebar-content">
        <Button
          onClick={handleUserProfileClick}
          variant="contained"
          className="sidebar-button"
          sx={{ mb: 2 }} 
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
      <Modal
        isOpen={isUserProfileOpen}
        onRequestClose={closeUserProfileModal}
        contentLabel="User Profile Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            width: '500px',
            margin: 'auto',
            padding: '20px',
            borderRadius: '8px',
            maxHeight: '60vh',
            overflowY: 'auto', 
          },
        }}
      >
        <UserProfile onClose={closeUserProfileModal} />
      </Modal>
    </div>
  );
};

export default Sidebar;
