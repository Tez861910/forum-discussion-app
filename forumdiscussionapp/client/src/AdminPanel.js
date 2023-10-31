import React from 'react';
import { Link } from 'react-router-dom';

function AdminPanel() {
  console.log('Admin Panel rendered'); 
  return (
    <div>
      <h2>Admin Panel</h2>
      <ul>
        <li>
          <Link to="/adminpanel/courses">Manage Courses</Link>
        </li>
        <li>
          <Link to="/adminpanel/threads">Manage Threads</Link>
        </li>
        <li>
          <Link to="/adminpanel/comments">Manage Comments</Link>
        </li>
        <li>
          <Link to="/adminpanel/users">Manage Users</Link>
        </li>
      </ul>
    </div>
  );
}

export default AdminPanel;
