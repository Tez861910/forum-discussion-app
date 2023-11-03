import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './createthread.css';

function CreateThread() {
  const [threads, setThreads] = useState([]);
  const [newThread, setNewThread] = useState({
    title: 'New Thread Title',
    content: 'New Thread Content',
  });

  // Function to fetch existing threads for the teacher's course
  //const courseId = localStorage.getItem('courseId');
  const courseId = parseInt(localStorage.getItem('courseId'), 10); 

  useEffect(() => {
    axios
      .get(`http://localhost:8081/threads/threads/course?courseId=${courseId}`)
      .then((response) => {
        setThreads(response.data);
      })
      .catch((error) => {
        console.error('Error fetching threads:', error);
      });
  }, [courseId]);

  // Function to update the newThread state when the user types into the form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewThread({ ...newThread, [name]: value });
  };

  // Function to create a new thread
  const createNewThread = () => {
    axios
      .post('http://localhost:8081/threads/threads/create', {
        title: newThread.title,
        content: newThread.content,
        courseId:  newThread.courseId,
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

      <form>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={newThread.title}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Content:
          <textarea
            name="content"
            value={newThread.content}
            onChange={handleInputChange}
          />
        </label>
        <button onClick={createNewThread} className="create-button">
          Create New Thread
        </button>
      </form>
    </div>
  );
}

export default CreateThread;
