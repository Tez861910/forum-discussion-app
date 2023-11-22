import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

const Navbar = ({
  renderButtonsByRoleId,
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
      <Button onClick={() => onCourseSelect('courses')} color="inherit">
        Courses
      </Button>
      <Button onClick={() => onCourseSelect('users')} color="inherit">
        Users
      </Button>
      <Button onClick={() => onCourseSelect('roles')} color="inherit">
        Roles
      </Button>
    </>
  );

  const renderForumDiscussionButton = () => (
    <Button
      onClick={onForumDiscussionButtonClick}
      color="primary"
      disabled={!selectedCourse}
    >
      Forum Discussion
    </Button>
  );

  const renderBackToCoursesButton = () => (
    <Button
      onClick={(event) => handleChange(event, null)}
      color="primary"
      disabled={!selectedCourse}
    >
      Back to Courses
    </Button>
  );

  return (
    <Box>
      <ButtonGroup variant="contained" aria-label="outlined primary button group" sx={{ my: 3 }}>
        {renderButtonsByRoleId(roleId)}

        {roleId === '2' && renderForumDiscussionButton()}

        {roleId === '3' && renderBackToCoursesButton()}
      </ButtonGroup>
    </Box>
  );
};

Navbar.propTypes = {
  renderButtonsByRoleId: PropTypes.func.isRequired,
  roleId: PropTypes.string.isRequired,
  onCourseSelect: PropTypes.func.isRequired,
  selectedCourse: PropTypes.string,
  onForumDiscussionButtonClick: PropTypes.func,
};

export default Navbar;
