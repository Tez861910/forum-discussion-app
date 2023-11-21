import React from 'react';
import PropTypes from 'prop-types';
import CreateThread from '../threads/create-thread';
import Typography from '@mui/material/Typography';

const Navbar = ({
  renderButtonsByRoleId,
  roleId,
  onCourseSelect,
  selectedCourse,
}) => {
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
  onCourseSelect: PropTypes.func.isRequired,
  selectedCourse: PropTypes.string,
};

export default Navbar;
