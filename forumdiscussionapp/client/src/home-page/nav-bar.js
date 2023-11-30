import * as React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, Box, Typography, Alert, styled } from '@mui/material';
import EnrolledCoursesDropdown from './enrolled-courses-dropdown';

const StyledButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  '& .MuiButton-root': {
    margin: theme.spacing(1),
  },
  '& .MuiButton-outlinedPrimary': {
    borderColor: theme.palette.primary.main,
  },
}));

const Navbar = ({
  userId,
  roleId,
  onButtonClick,
  selectedCourse,
  isTeacherOrStudent,
  onCourseSelect,
  handleCourseChange,
}) => {
  return (
    <Box sx={{ my: 3 }}>
      <StyledButtonGroup variant="contained" aria-label="outlined primary button group">
        {roleId === '1' && (
          <>
            <Button onClick={() => onButtonClick('/home/admin-courses', userId, selectedCourse)} variant="outlined" color="primary">
              Manage Courses
            </Button>
            <Button onClick={() => onButtonClick('/home/admin-users', userId, selectedCourse)} variant="outlined" color="primary">
              Manage Users
            </Button>
            <Button onClick={() => onButtonClick('/home/admin-roles', userId, selectedCourse)} variant="outlined" color="primary">
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
              variant="outlined"
              color="primary"
              disabled={!selectedCourse}
            >
              Forum Discussion
            </Button>

            {isTeacherOrStudent && roleId === '2' && (
              <Button
                onClick={() => onButtonClick('/home/mcq-form', userId, selectedCourse)}
                variant="outlined"
                color="primary"
                disabled={!selectedCourse}
              >
                Create MCQ
              </Button>
            )}
            {isTeacherOrStudent && roleId === '3' && (
              <Button
                onClick={() => onButtonClick('/home/mcq-answer-form', userId, selectedCourse)}
                variant="outlined"
                color="primary"
                disabled={!selectedCourse}
              >
                Answer MCQ
              </Button>
            )}
          </Box>
        )}

        <Button onClick={() => onButtonClick('/home/scheduler', userId,roleId, selectedCourse)} variant="outlined" color="primary">
          Scheduler
        </Button>
      </StyledButtonGroup>
      {((roleId === '2' || roleId === '3') && !selectedCourse) && (
       <Alert severity="info" sx={{ mt: 2 }}>
       <Typography variant="body2">
        Please select a course to enable more options.
       </Typography>
     </Alert>
   )}
    </Box>
   );
};

Navbar.propTypes = {
  roleId: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired,
  selectedCourse: PropTypes.string,
  isTeacherOrStudent: PropTypes.bool,
  onCourseSelect: PropTypes.func.isRequired,
  handleCourseChange: PropTypes.func.isRequired,
};

export default Navbar;
