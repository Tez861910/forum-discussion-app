import React, { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';
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
    </div>
  );
}

export default Home;
