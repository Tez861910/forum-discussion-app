import React, { useState, useEffect } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import CreateThread from './CreateThread';
import CommentSection from './CommentSection';
import MCQForm from './MCQForm';
import MCQAnswerForm from './MCQAnswerForm';
import AdminPanel from './AdminPanel';
import './Home.css';

function Home() {
  const [roleId, setRoleId] = useState('');

  useEffect(() => {
    const storedRoleId = localStorage.getItem('roleId');
    setRoleId(storedRoleId);
  }, []);

  return (
    <div className="container">
      <h2>Home Panel</h2>
      {roleId === '1' && (
        <Link to="/home/adminpanel" className="btn btn-success my-3">
          Admin Panel
        </Link>
      )}
      {roleId === '2' && (
        <>
          <Link to="/home/createthread" className="btn btn-primary my-3">
            Create Thread
          </Link>
          <Link to="/home/mcqform" className="btn btn-primary my-3">
            Create MCQ Question
          </Link>
        </>
      )}
      {roleId === '3' && (
        <>
          <Link to="/home/commentsection" className="btn btn-primary my-3">
            Comment Section
          </Link>
          <Link to="/home/mcqanswerform" className="btn btn-primary my-3">
            Answer MCQ Question
          </Link>
        </>
      )}
      <Routes>
        <Route path="/home/adminpanel" element={<AdminPanel />} />
        <Route path="/home/createthread" element={<CreateThread />} />
        <Route path="/home/commentsection" element={<CommentSection />} />
        <Route path="/home/mcqform" element={<MCQForm />} />
        <Route path="/home/mcqanswerform" element={<MCQAnswerForm />} />
      </Routes>
    </div>
  );
}

export default Home;
