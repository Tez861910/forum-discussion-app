import React, { useState, useEffect } from 'react';
import { Button, Modal, Select, MenuItem } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import CourseEnrollmentModal from './course-enrollment-modal';
import UserProfile from './user-profile';
import './home.css';

const Sidebar = ({
  isEnrollmentModalOpen,
  enrolledCourses,
  setEnrollmentModalOpen,
  handleEnrollmentSuccess,
  handleLogout,
  setUserProfileOpen,
  handleCourseButtonClick,
  roleId,
}) => {
  const [isUserProfileOpen, setLocalUserProfileOpen] = useState(false);
  const [hasEnrolledCourses, setHasEnrolledCourses] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isUserProfileModalVisible, setIsUserProfileModalVisible] = useState(false);

  useEffect(() => {
    setHasEnrolledCourses(roleId === '3' && enrolledCourses.length > 0);
  }, [roleId, enrolledCourses]);

  const handleUserProfileClick = () => {
    setLocalUserProfileOpen(true);
    setIsUserProfileModalVisible(true);
    setUserProfileOpen(true);
  };

  const handleEnrollNowClick = () => {
    if (roleId === '3' && (!hasEnrolledCourses || enrolledCourses.length === 0)) {
      setEnrollmentModalOpen(true);
    }
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

  const handleModalClose = () => {
    setLocalUserProfileOpen(false);
    setIsUserProfileModalVisible(false);
    setUserProfileOpen(false);
  };

  const handleNavigateBack = () => {
    if (isUserProfileModalVisible) {
      setLocalUserProfileOpen(false);
      setIsUserProfileModalVisible(false);
      setUserProfileOpen(false);
    }
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-content">
        <Button
          variant="contained"
          className="sidebar-button"
          sx={{ mb: 2 }}
          onClick={handleUserProfileClick}
        >
          User Profile
        </Button>
        {(hasEnrolledCourses || enrolledCourses.length === 0) && roleId === '3' && (
          <Button
            onClick={handleEnrollNowClick}
            variant="contained"
            className="sidebar-button"
            startIcon={<AddIcon />}
            sx={{ mb: 2 }}
          >
            Enroll Now
          </Button>
        )}
        {hasEnrolledCourses && (
          <Select
            value={selectedCourse}
            onChange={(event) => setSelectedCourse(event.target.value)}
            displayEmpty
            sx={{ mb: 2 }}
          >
            <MenuItem value="" disabled>
              Select a Course
            </MenuItem>
            {enrolledCourses.map((course) => (
              <MenuItem key={course.CourseID} value={course.CourseID}>
                {course.CourseName}
              </MenuItem>
            ))}
          </Select>
        )}
        {renderCourseButtons()} 
        {selectedCourse && (
          <Button
            onClick={() => handleCourseButtonClick(selectedCourse)}
            variant="contained"
            className="sidebar-button"
            sx={{ mb: 2 }}
          >
            Create Thread
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
        enrolledCourses={enrolledCourses}
      />
      <Modal open={isUserProfileOpen} onClose={handleModalClose}>
        <UserProfile onClose={handleModalClose} />
      </Modal>
    </div>
  );
};

export default Sidebar;
