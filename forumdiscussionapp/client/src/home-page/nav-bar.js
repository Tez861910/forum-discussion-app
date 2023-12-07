import * as React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, Box, Typography, Alert } from '@mui/material';
import EnrolledCoursesDropdown from './enrolled-courses-dropdown';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = ({
  userId,
  roleId,
  onButtonClick,
  selectedCourse,
  isTeacherOrStudent,
  onCourseSelect,
  handleCourseChange,
  handleDrawerToggle,
}) => {

  const getRoleHeaderText = (roleId) => {
    const roleTitles = {
      '1': 'Admin Home Panel',
      '2': 'Teacher Home Panel',
      '3': 'Student Home Panel',
    };
    return roleTitles[roleId] || 'Home Panel';
  };

  return (
    <AppBar position="static" color="primary" sx={{ mb: 3 }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={handleDrawerToggle}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1 }}>
          {getRoleHeaderText(roleId)}
        </Typography>
        <ButtonGroup variant="contained" color="secondary" aria-label="outlined primary button group" sx={{ '& .MuiButton-root': { mx: 1 } }}>
          {roleId === '1' && (
            <>
              <Button onClick={() => onButtonClick('/home/admin-courses', userId, selectedCourse)}>
                Manage Courses
              </Button>
              <Button onClick={() => onButtonClick('/home/admin-users', userId, selectedCourse)}>
                Manage Users
              </Button>
              <Button onClick={() => onButtonClick('/home/admin-roles', userId, selectedCourse)}>
                Manage Roles
              </Button>
            </>
          )}

          {(roleId === '2' || roleId === '3') && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <EnrolledCoursesDropdown
                onCourseSelect={onCourseSelect}
                onCourseChange={handleCourseChange}
              />
              <Button
                onClick={() => onButtonClick('/home/forum-discussion', userId, selectedCourse)}
                disabled={!selectedCourse}
              >
                Forum Discussion
              </Button>

              {isTeacherOrStudent && roleId === '2' && (
                <Button
                  onClick={() => onButtonClick('/home/mcq-form', userId, selectedCourse)}
                  disabled={!selectedCourse}
                >
                  Create MCQ
                </Button>
              )}
              {isTeacherOrStudent && roleId === '3' && (
                <Button
                  onClick={() => onButtonClick('/home/mcq-answer-form', userId, selectedCourse)}
                  disabled={!selectedCourse}
                >
                  Answer MCQ
                </Button>
              )}
            </Box>
          )}

          <Button onClick={() => onButtonClick('/home/scheduler', userId,roleId, selectedCourse)}>
            Scheduler
          </Button>
        </ButtonGroup>
      </Toolbar>
      {((roleId === '2' || roleId === '3') && !selectedCourse) && (
       <Alert severity="info" sx={{ mt: 2 }}>
       <Typography variant="body2">
        Please select a course to enable more options.
       </Typography>
     </Alert>
   )}
    </AppBar>
  );
};

Navbar.propTypes = {
  roleId: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired,
  selectedCourse: PropTypes.string,
  isTeacherOrStudent: PropTypes.bool,
  onCourseSelect: PropTypes.func.isRequired,
  handleCourseChange: PropTypes.func.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
};

export default Navbar;
