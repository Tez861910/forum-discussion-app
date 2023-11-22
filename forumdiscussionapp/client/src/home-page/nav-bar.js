import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

const Navbar = ({
  roleId,
  onCourseSelect,
  selectedCourse,
  onForumDiscussionButtonClick,
}) => {
  const handleChange = (event, courseId) => {
    event.stopPropagation();
    onCourseSelect(courseId);
  };

  const renderAdminPanelButtons = () => (
    <>
      <Button onClick={() => onCourseSelect('courses')} variant="outlined" color="primary">
        Courses
      </Button>
      <Button onClick={() => onCourseSelect('users')} variant="outlined" color="primary">
        Users
      </Button>
      <Button onClick={() => onCourseSelect('roles')} variant="outlined" color="primary">
        Roles
      </Button>
    </>
  );

  const renderForumDiscussionButton = () => (
    <Button
      onClick={onForumDiscussionButtonClick}
      variant="contained"
      color="primary"
      disabled={!selectedCourse}
    >
      Forum Discussion
    </Button>
  );

  const renderBackToCoursesButton = () => (
    <Button
      onClick={(event) => handleChange(event, null)}
      variant="contained"
      color="primary"
      disabled={!selectedCourse}
    >
      Back to Courses
    </Button>
  );

  const renderRoleSpecificButtons = () => {
    switch (roleId) {
      case '1':
        return renderAdminPanelButtons();
      case '2':
      case '3':
        return renderForumDiscussionButton();
      default:
        return null;
    }
  };

  return (
    <Box>
      <ButtonGroup variant="contained" aria-label="outlined primary button group" sx={{ my: 3 }}>
        {renderRoleSpecificButtons()}
        {roleId === '3' && renderBackToCoursesButton()}
      </ButtonGroup>
    </Box>
  );
};

Navbar.propTypes = {
  roleId: PropTypes.string.isRequired,
  onCourseSelect: PropTypes.func.isRequired,
  selectedCourse: PropTypes.string,
  onForumDiscussionButtonClick: PropTypes.func,
};

export default Navbar;
