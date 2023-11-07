import React, { useState } from 'react';
import './adminpanel.css';
import AdminCourses from './AdminCourses';
import AdminThreads from './AdminThreads';
import AdminComments from './AdminComments';
import AdminUsers from './AdminUsers';
import AdminRoles from './AdminRoles';

function AdminPanel() {
  console.log('Admin Panel rendered');
  const [activeView, setActiveView] = useState('courses');

  const handleViewChange = (view) => {
    setActiveView(view);
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'courses':
        return <AdminCourses />;
      case 'threads':
        return <AdminThreads />;
      case 'comments':
        return <AdminComments />;
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
        <button onClick={() => handleViewChange('courses')}>Manage Courses</button>
        <button onClick={() => handleViewChange('threads')}>Manage Threads</button>
        <button onClick={() => handleViewChange('comments')}>Manage Comments</button>
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
