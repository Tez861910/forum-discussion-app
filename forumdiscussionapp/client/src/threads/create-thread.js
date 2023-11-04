import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './create-thread.css';

function CreateThread() {
  const [threads, setThreads] = useState([]);
  const [newThread, setNewThread] = useState({
    title: 'New Thread Title',
    content: 'New Thread Content',
  });
  const [courseId, setCourseId] = useState(null);
  const [userId, setUserId] = useState(null);

  const fetchThreads = async () => {
    const storedUserId = localStorage.getItem('userId');
    const storedCourseId = localStorage.getItem('courseId');
    if (!storedUserId) {
      console.error('User ID not found in local storage');
      return;
    }
    if (!storedCourseId) {
      console.error('Course ID not found in local storage');
      return;
    }

    const userIdNumber = parseInt(storedUserId, 10);
    setUserId(userIdNumber);

    const courseIdNumber = parseInt(storedCourseId, 10);
    setCourseId(courseIdNumber);

    try {
      // Fetch existing threads for the teacher's course
      const response = await axios.get(`http://localhost:8081/threads/threads/course/${courseIdNumber}`);
      console.log('API Response:', response.data);
      setThreads(response.data);
    } catch (error) {
      console.error('Error fetching threads:', error);
    }
  };

  useEffect(() => {
    fetchThreads();
  }, []);

  // Function to update the newThread state when the user types into the form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewThread({ ...newThread, [name]: value });
  };

  // Function to create a new thread
  const createNewThread = async () => {
    try {
      // Create the new thread
      await axios.post('http://localhost:8081/threads/threads/create', {
        title: newThread.title,
        content: newThread.content,
        courseId: courseId,
        userId: userId,
      });

      // Fetch threads again to include the new one
      await fetchThreads();
    } catch (error) {
      console.error('Error creating thread:', error);
    }
  };

  console.log('Threads:', threads);

  return (
    <div className="create-thread-container">
      <h2>Create Thread</h2>
      <h3>Your Threads:</h3>
      {Array.isArray(threads) && threads.length > 0 ? (
       <ul className="thread-list">
       {threads.map((thread) => (
         <li key={thread.ThreadID} className="thread-item">
           <p className="thread-title">Title: {thread.ThreadTitle}</p>
           <p className="thread-content">Content: {thread.ThreadContent}</p>
           <button className="edit-button">Edit</button>
           <button className="delete-button">Delete</button>
         </li>
       ))}
     </ul>
     
      ) : (
        <p>No threads available.</p>
      )}

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
