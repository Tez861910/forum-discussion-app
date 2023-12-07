import * as React from 'react';
import PropTypes from 'prop-types';
import { Button, Box, Stack, Avatar, Typography, Drawer,  IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CourseEnrollmentModal from './course-enrollment-modal';
import UserProfile from './user-profile';
import AvatarUploadModal from './AvatarUploadModal'; 

const Sidebar = ({
  open,
  handleDrawerToggle,
  isEnrollmentModalOpen,
  setEnrollmentModalOpen,
  handleEnrollmentSuccess,
  handleLogout,
  isUserProfileOpen,
  setUserProfileOpen,
  roleId,        
}) => {


  
  const [isAvatarModalOpen, setAvatarModalOpen] = React.useState(false); 

  const handleUserProfileClick = () => {
    setUserProfileOpen(true);
  };

  const handleEnrollNowClick = () => {
    if (roleId === '3') {
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
      '1': 'Admin',
      '2': 'Teacher',
      '3': 'Student',
    };
    return roleNames[roleId] || 'User';
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="persistent"
        anchor="left"
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
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', py: 1, px: 2 }}>
          <IconButton onClick={handleDrawerToggle}>
            <ChevronLeftIcon />
          </IconButton>
        </Box>
        <Box sx={{ p: 2 }}>
          <Stack spacing={2}>
            {/* User Avatar */}
            <Avatar sx={{ width: 56, height: 56, mb: 2 }} onClick={handleAvatarClick}>U</Avatar>

            {/* User Role */}
            <Typography variant="h6" gutterBottom component="div">
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
        {/* Course Enrollment Modal */}
        <CourseEnrollmentModal
          isOpen={isEnrollmentModalOpen}
          onRequestClose={() => setEnrollmentModalOpen(false)}
          onEnrollSuccess={handleEnrollmentSuccess}
        />

        {/* User Profile Modal */}
        <UserProfile 
          isOpen={isUserProfileOpen}
          onClose={handleModalClose} 
        />

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
};


export default Sidebar;
