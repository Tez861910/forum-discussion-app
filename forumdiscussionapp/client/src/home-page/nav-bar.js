import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Navbar = ({ renderButtonsByRoleId, roleId, enrolledCourses, onCourseSelect }) => {
  const handleCourseSelect = (courseId) => {
    onCourseSelect(courseId);
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
            <li className="nav-item dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="enrolledCoursesDropdown"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Enrolled Courses
              </button>
              <div className="dropdown-menu" aria-labelledby="enrolledCoursesDropdown">
                {enrolledCourses.map((course) => (
                  <button
                    key={course.CourseID}
                    className="dropdown-item"
                    onClick={() => handleCourseSelect(course.CourseID)}
                  >
                    {course.CourseName}
                  </button>
                ))}
              </div>
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
};

export default Navbar;
