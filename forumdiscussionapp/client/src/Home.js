// Home.js
import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import CreateThread from './CreateThread';
import CommentSection from './CommentSection';
import MCQForm from './MCQForm';
import MCQAnswerForm from './MCQAnswerForm';
import AdminPanel from './AdminPanel'; 

function Home() {
  const [roleId, setRoleId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedRoleId = localStorage.getItem('roleId');
    setRoleId(storedRoleId);
  }, []);

  return (
    <div className="container">
      <h2>Home Panel</h2>
      {roleId === '1' && (
        <button onClick={() => navigate('/home/adminpanel')} className="btn btn-success my-3">
          Admin Panel
        </button>
      )}
      {roleId === '2' && (
        <>
          <button onClick={() => navigate('/home/createthread')} className="btn btn-primary my-3">
            Create Thread
          </button>
          <button onClick={() => navigate('/home/mcqform')} className="btn btn-primary my-3">
            Create MCQ Question
          </button>
        </>
      )}
      {roleId === '3' && (
        <>
          <button onClick={() => navigate('/home/commentsection')} className="btn btn-primary my-3">
            Comment Section
          </button>
          <button onClick={() => navigate('/home/mcqanswerform')} className="btn btn-primary my-3">
            Answer MCQ Question
          </button>
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
