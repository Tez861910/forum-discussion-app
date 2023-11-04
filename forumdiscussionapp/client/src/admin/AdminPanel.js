import React from 'react';
import './adminpanel.css';
import AdminCourses from './AdminCourses';
import AdminThreads from './AdminThreads';
import AdminComments from './AdminComments';
import AdminUsers from './AdminUsers';

function AdminPanel() {
  console.log('Admin Panel rendered'); 
  return (
    <div>
      <h2>Admin Panel</h2>
      <AdminCourses />
      <AdminThreads />
      <AdminComments />
      <AdminUsers />
    </div>
  );
}

export default AdminPanel;
