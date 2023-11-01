import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './createthread.css';

function CreateThread() {
  const [threads, setThreads] = useState([]);
  const courseId = localStorage.getItem('courseId'); 

  useEffect(() => {
    // Fetch threads for the teacher's course
    axios.get(`http://localhost:8081/threads/course?courseId=${courseId}`)
      .then((response) => {
        setThreads(response.data);
      })
      .catch((error) => {
        console.error('Error fetching threads:', error);
      });
  }, [courseId]);

  // Function to create a new thread
  const createNewThread = () => {
    axios.post('http://localhost:8081/threads/create', {
      courseId: courseId,
      title: 'New Thread Title',
      content: 'New Thread Content',
    })
      .then((response) => {
        
        console.log('Thread created successfully.');
      
      })
      .catch((error) => {
       
        console.error('Error creating thread:', error);
      });
  };

  return (
    <div className="create-thread-container">
      <h2>Create Thread</h2>
      <h3>Your Threads:</h3>
      <ul className="thread-list">
        {threads.map((thread) => (
          <li key={thread.threadId} className="thread-item">
            <p className="thread-title">Title: {thread.title}</p>
            <p className="thread-content">Content: {thread.content}</p>
            <button className="edit-button">Edit</button>
            <button className="delete-button">Delete</button>
          </li>
        ))}
      </ul>

      <button onClick={createNewThread} className="create-button">Create New Thread</button>
    </div>
  );
}

export default CreateThread;
