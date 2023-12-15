import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, IconButton, Typography, Button, ButtonGroup, Box, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from '@mui/icons-material/Menu';
import EnrolledCoursesDropdown from './enrolled-courses-dropdown';

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
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

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
        <IconButton edge="start" color="secondary" aria-label="menu" sx={{ mr: 2 }} onClick={handleDrawerToggle}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h5" color="inherit" component="div" sx={{ flexGrow: 1, mr: 2 }}>
          {getRoleHeaderText(roleId)}
        </Typography>
        <ButtonGroup variant="contained" color="secondary" aria-label="outlined primary button group" sx={{ '& .MuiButton-root': { mx: 1 }, flexDirection: matches ? 'row' : 'column' }}>
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
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: matches ? 'row' : 'column' }}>
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

          <Button onClick={() => onButtonClick('/home/scheduler', userId, roleId, selectedCourse)}>
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
  userId: PropTypes.string.isRequired,
  roleId: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired,
  selectedCourse: PropTypes.string,
  isTeacherOrStudent: PropTypes.bool.isRequired,
  onCourseSelect: PropTypes.func.isRequired,
  handleCourseChange: PropTypes.func.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
};

export default Navbar;
