import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import MCQForm from './MCQForm';
import MCQAnswerForm from './MCQAnswerForm';

function Home() {
  const [roleId, setRoleId] = useState('');
  const [mcqQuestions, setMCQQuestions] = useState([]);

  useEffect(() => {
    const storedRoleId = localStorage.getItem('roleId');
    setRoleId(storedRoleId);
  }, []);

  const handleSaveMCQ = (mcq) => {
   
    console.log('Saved MCQ:', mcq);
    setMCQQuestions([...mcqQuestions, mcq]);
  };

  
  const handleAnswerMCQ = (questionIndex, answer) => {
   
    console.log('Answered MCQ:', questionIndex, answer);
  };

  return (
    <div className="container">
      <h2>Home Panel</h2>
      {roleId === '1' && (
        <Link to="adminpanel" className="btn btn-success my-3">
          Admin Panel
        </Link>
      )}
      {roleId === '2' && (
        <>
          <MCQForm onSave={handleSaveMCQ} />
          <Link to="createthread" className="btn btn-primary my-3">
            Create Thread
          </Link>
        </>
      )}
      {roleId === '3' && (
        <>
          {mcqQuestions.length > 0 &&
            mcqQuestions.map((question, index) => (
              <MCQAnswerForm
                key={index}
                question={question.question}
                options={question.options}
                onAnswer={(answer) => handleAnswerMCQ(index, answer)}
              />
            ))}
          <Link to="commentsection" className="btn btn-primary my-3">
            Comment Section
          </Link>
        </>
      )}
    </div>
  );
}

export default Home;
