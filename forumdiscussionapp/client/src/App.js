import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Create from './Create';
import Read from './Read';
import Update from './Update';
import Home from './Home';
import Login from './login';
import Signup from './Signup';
import AdminPanel from './AdminPanel'; 
import CommentSection from './CommentSection'; 
import { ErrorProvider } from './ErrorHandling';

import ManageCourses from './AdminCourses';
import ManageThreads from './AdminThreads';
import ManageComments from './AdminComments';
import ManageUsers from './AdminUsers';


const App = () => (
  <ErrorProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />}>
          <Route
            index
            element={
              localStorage.getItem('role') === 'admin'
                ? <Navigate to="../admin" /> // Updated route to navigate to parent route
                : localStorage.getItem('role') === 'teacher'
                ? <Navigate to="../create-thread" /> // Updated route to navigate to parent route
                : <Navigate to="../comment-section" /> // Updated route to navigate to parent route
            }
          />
          <Route path="admin" element={<AdminPanel />}>
            {/* Nested routes under /home/admin */}
            <Route index element={<AdminPanel />} />
            <Route path="courses" element={<ManageCourses />} />
            <Route path="threads" element={<ManageThreads />} />
            <Route path="comments" element={<ManageComments />} />
            <Route path="users" element={<ManageUsers />} />
          </Route>
          <Route path="create" element={<Create />} />
          <Route path="create-thread" element={<Create />} />
          <Route path="read/:id" element={<Read />} />
          <Route path="update/:id" element={<Update />} />
          <Route path="comment-section" element={<CommentSection />} />
        </Route>
      </Routes>
    </Router>
  </ErrorProvider>
);

export default App;
