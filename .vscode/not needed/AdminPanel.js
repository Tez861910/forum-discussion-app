import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './adminpanel.css';
import AdminCourses from './AdminCourses';

import AdminUsers from './AdminUsers';
import AdminRoles from './AdminRoles';

function AdminPanel() {
  console.log('Admin Panel rendered');
  const [activeView, setActiveView] = useState('courses');
  const navigate = useNavigate();

  const handleViewChange = (view) => {
    setActiveView(view);
  };

  const handleBack = () => {
    navigate('/home');
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'courses':
        return <AdminCourses />;
      case 'users':
        return <AdminUsers />;
      case 'roles':
        return <AdminRoles />;
      default:
        return <AdminCourses />;
    }
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <div className="admin-navigation">
        <button onClick={handleBack}>Back to Home</button>
        <button onClick={() => handleViewChange('courses')}>Manage Courses</button>
        <button onClick={() => handleViewChange('users')}>Manage Users</button>
        <button onClick={() => handleViewChange('roles')}>Manage Roles</button>
      </div>
      <div className="admin-container">
        {renderActiveView()}
      </div>
    </div>
  );
}

export default AdminPanel;
