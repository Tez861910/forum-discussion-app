import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import UserProfile from '../user-profile/user-profile';

export function Home() {
  const [roleId, setRoleId] = useState(''); 

  useEffect(() => {
    const storedRoleId = localStorage.getItem('roleId');
    setRoleId(storedRoleId); 

    // If you want to perform any actions when roleId changes, you can do it here.
  }, []); // Empty dependency array to run the effect only once

  return (
    <div className="container">
      <h2>Home Panel</h2>

      <UserProfile />

      {roleId === '1' && (
        <Link to="/home/adminpanel" className="btn btn-success my-3">
          Admin Panel
        </Link>
      )}
      {roleId === '2' && (
        <>
        <div class="flex">
          <Link to="/home/create-thread" className="btn btn-primary my-3">
            Create Thread
          </Link>
          </div>
          <div class="flex">
          <Link to="/home/mcq-form" className="btn btn-primary my-3">
            Create MCQ Question
          </Link>
        </div>
        </>
      )}
      {roleId === '3' && (
        <>
          <Link to="/home/comment-section" className="btn btn-primary my-3">
            Comment Section
          </Link>
          <Link to="/home/mcqanswerform" className="btn btn-primary my-3">
            Answer MCQ Question
          </Link>
        </>
      )}
    </div>
  );
}

