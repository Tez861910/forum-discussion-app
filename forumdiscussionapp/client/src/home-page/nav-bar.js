import { Link } from 'react-router-dom'
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Navbar = ({ renderButtonsByRoleId, roleId, enrolledCourses, onCourseSelect, fetchUserCourses }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCourseSelect = (courseId) => {
    onCourseSelect(courseId);
    handleClose();
  };

  const handleEnrolledCoursesClick = async () => {
    await fetchUserCourses();
    handleClick();
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-transparent">
      <Link to="/" className="navbar-brand bi bi-justify-left fs-4"></Link>
      <button
        className="navbar-toggler d-lg-none"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapsibleNavId"
        aria-controls="collapsibleNavId"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i className="bi bi-justify"></i>
      </button>
      <div className="collapse navbar-collapse" id="collapsibleNavId">
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
        </ul>
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
