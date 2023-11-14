// Navbar.jsx

import React from 'react';
import './home.css';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = ({ renderButtonsByRoleId, onButtonClick, roleId, enrolledCourses }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-transparent">
      <i className="navbar-brand bi bi-justify-left fs-4" onClick={() => onButtonClick('/')}></i>
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

          {enrolledCourses && enrolledCourses.length > 0 && (
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle"
                type="button"
                id="enrolledCoursesDropdown"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Enrolled Courses
              </button>
              <div className="dropdown-menu" aria-labelledby="enrolledCoursesDropdown">
                {enrolledCourses.map((courseId) => (
                  <Link key={courseId} to={`/home/course/${courseId}`} className="dropdown-item">
                    Course {courseId}
                  </Link>
                ))}
              </div>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
