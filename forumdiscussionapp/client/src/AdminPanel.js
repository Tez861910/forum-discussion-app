import React from 'react';
import { Link } from 'react-router-dom';

function AdminPanel() {
  return (
    <div>
      <h2>Admin Panel</h2>
      <Link to="/admin/courses">Manage Courses</Link>
      <Link to="/admin/threads">Manage Threads</Link>
      <Link to="/admin/comments">Manage Comments</Link>
      <Link to="/admin/users">Manage Users</Link>
    </div>
  );
}

export default AdminPanel;
