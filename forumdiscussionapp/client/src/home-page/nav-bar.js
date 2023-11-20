import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CreateThread from '../threads/create-thread';
import Typography from '@mui/material/Typography';

const Navbar = ({
  renderButtonsByRoleId,
  roleId,
  enrolledCourses,
  onCourseSelect,
  fetchUserCourses,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCourseSelect = (courseId) => {
    setSelectedCourse(courseId);
    onCourseSelect(courseId);
    handleClose();
  };

  const handleEnrolledCoursesClick = async () => {
    await fetchUserCourses();
    handleClick();
  };

  const renderCreateThread = () => {
    if (roleId === '2' || roleId === '3') {
      if (selectedCourse) {
        return <CreateThread courseId={selectedCourse} />;
      } else {
        return (
          <Typography variant="h6" sx={{ my: 3 }}>
            Please select a course to create a thread.
          </Typography>
        );
      }
    }
    return null;
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-transparent">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
            {renderButtonsByRoleId(roleId)}

            {roleId !== '1' && enrolledCourses.length > 0 && (
              <li className="nav-item">
                <Button
                  onClick={handleEnrolledCoursesClick}
                  color="secondary"
                  variant="outlined"
                >
                  Enrolled Courses
                </Button>
                <Menu
                  id="enrolled-courses-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  {enrolledCourses.map((course) => (
                    <MenuItem key={course.CourseID} onClick={() => handleCourseSelect(course.CourseID)}>
                      {course.CourseName}
                    </MenuItem>
                  ))}
                </Menu>
              </li>
            )}

            {/* Use the renderCreateThread function here */}
            {renderCreateThread()}
          </ul>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  renderButtonsByRoleId: PropTypes.func.isRequired,
  roleId: PropTypes.string.isRequired,
  enrolledCourses: PropTypes.array.isRequired,
  onCourseSelect: PropTypes.func.isRequired,
  fetchUserCourses: PropTypes.func.isRequired,
};

export default Navbar;
