import * as React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, Box, Typography, Alert, styled } from '@mui/material';

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
}) => {
  return (
    <Box sx={{ my: 3 }}>
      <StyledButtonGroup variant="contained" aria-label="outlined primary button group">
        {roleId === '1' && (
          <>
            <Button onClick={() => onButtonClick('admin-courses', userId, selectedCourse)} variant="outlined" color="primary">
              Manage Courses
            </Button>
            <Button onClick={() => onButtonClick('admin-users', userId, selectedCourse)} variant="outlined" color="primary">
              Manage Users
            </Button>
            <Button onClick={() => onButtonClick('admin-roles', userId, selectedCourse)} variant="outlined" color="primary">
              Manage Roles
            </Button>
          </>
        )}

        {(roleId === '2' || roleId === '3') && (
          <>
            <Button
              onClick={() => onButtonClick('forum-discussion', userId, selectedCourse)}
              variant="outlined"
              color="primary"
              disabled={!selectedCourse}
            >
              Forum Discussion
            </Button>

            {isTeacherOrStudent && roleId === '2' && (
              <Button
                onClick={() => onButtonClick('mcq-form', userId, selectedCourse)}
                variant="outlined"
                color="primary"
                disabled={!selectedCourse}
              >
                Create MCQ
              </Button>
            )}
            {isTeacherOrStudent && roleId === '3' && (
              <Button
                onClick={() => onButtonClick('mcq-answer-form', userId, selectedCourse)}
                variant="outlined"
                color="primary"
                disabled={!selectedCourse}
              >
                Answer MCQ
              </Button>
            )}
          </>
        )}

        <Button onClick={() => onButtonClick('scheduler', userId, selectedCourse)} variant="outlined" color="primary">
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
};

export default Navbar;
