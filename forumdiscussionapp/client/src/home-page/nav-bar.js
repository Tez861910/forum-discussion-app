import React from 'react';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';

const Navbar = ({
  renderButtonsByRoleId,
  onButtonClick,
  roleId,
  handleUserProfileClick,
  handleEnrollmentClick,
  handleLogout,

}) => {
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
          {roleId === '3' && (
            <Button onClick={handleEnrollmentClick} variant="contained" color="primary" size="small" startIcon={<AddIcon />}>
              Enroll Now
            </Button>
          )}
          <Button onClick={handleUserProfileClick} variant="contained" color="primary" size="small">
            User Profile
          </Button>
          <Button onClick={handleLogout} variant="contained" color="primary" size="small" startIcon={<LogoutIcon />}>
            Logout
          </Button>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
