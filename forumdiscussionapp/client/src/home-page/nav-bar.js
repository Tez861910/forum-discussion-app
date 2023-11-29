import * as React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, Box, Typography, Alert } from '@mui/material';

const Navbar = ({
  roleId,
  onButtonClick,
  selectedCourse,
  isTeacherOrStudent,
  onMCQFormButtonClick,
  onMCQAnswerFormButtonClick,
  onForumDiscussionButtonClick,
  onSchedulerButtonClick,  
}) => {
  return (
    <Box sx={{ my: 3 }}>
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        {roleId === '1' && (
          <>
            <Button onClick={() => onButtonClick('adminCourses')} variant="outlined" color="primary">
              Manage Courses
            </Button>
            <Button onClick={() => onButtonClick('adminUsers')} variant="outlined" color="primary">
              Manage Users
            </Button>
            <Button onClick={() => onButtonClick('adminRoles')} variant="outlined" color="primary">
              Manage Roles
            </Button>
          </>
        )}

        {(roleId === '2' || roleId === '3') && (
          <>
           <Button
              onClick={() => {
                onForumDiscussionButtonClick();
              }}
              variant="outlined"
              color="primary"
              disabled={!selectedCourse}
            >
              Forum Discussion
            </Button>

            {isTeacherOrStudent && roleId === '2' && (
              <Button
                onClick={onMCQFormButtonClick}
                variant="outlined"
                color="primary"
                disabled={!selectedCourse}
              >
                Create MCQ
              </Button>
            )}
            {isTeacherOrStudent && roleId === '3' && (
              <Button
                onClick={onMCQAnswerFormButtonClick}
                variant="outlined"
                color="primary"
                disabled={!selectedCourse}
              >
                Answer MCQ
              </Button>
            )}
          </>
        )}

        <Button onClick={onSchedulerButtonClick} variant="outlined" color="primary">
          Scheduler
        </Button>
      </ButtonGroup>
      {!selectedCourse && (
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
  isForumDiscussionVisible: PropTypes.bool,
  onMCQFormButtonClick: PropTypes.func,
  onMCQAnswerFormButtonClick: PropTypes.func,
  onForumDiscussionButtonClick: PropTypes.func,
  onSchedulerButtonClick: PropTypes.func, 
};

export default Navbar;
