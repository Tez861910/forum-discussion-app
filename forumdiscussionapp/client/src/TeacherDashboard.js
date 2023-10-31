import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TeacherDashboard() {
  const [threads, setThreads] = useState([]);
  const courseId = localStorage.getItem('courseId'); 

  useEffect(() => {
    axios.get(`http://localhost:8081/threads?courseId=${courseId}`)
      .then((response) => {
        setThreads(response.data);
      })
      .catch((error) => {
        console.error('Error fetching threads:', error);
      });
  }, [courseId]);

 
  return (
    <div>
      <h2>Teacher Dashboard</h2>
      <h3>Your Threads:</h3>
      <ul>
        {threads.map((thread) => (
          <li key={thread.threadId}>
            <p>Title: {thread.title}</p>
            <p>Content: {thread.content}</p>
            <button>Edit</button>
            <button>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TeacherDashboard;
