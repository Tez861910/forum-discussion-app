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
  const [editThread, setEditThread] = useState({ title: '', content: '', id: null });
  const [error, setError] = useState(null);

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
      const response = await axios.get(`http://localhost:8081/threads/threads/get/${courseIdNumber}`);
      setThreads(response.data);
    } catch (error) {
      setError('Error fetching threads. Please try again.');
    }
  };

  useEffect(() => {
    fetchThreads();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewThread({ ...newThread, [name]: value });
  };

  const createNewThread = async () => {
    try {
       await axios.post('http://localhost:8081/threads/threads/create', {
        title: newThread.title,
        content: newThread.content,
        courseId: courseId,
        userId: userId,
      });

      await fetchThreads();
      setNewThread({ title: '', content: '' }); 
    } catch (error) {
      setError('Error creating thread. Please try again.');
    }
  };

  const handleEditClick = async (threadId) => {
    try {
      const response = await axios.get(`http://localhost:8081/threads/threads/get/${threadId}`);
      setEditThread({ ...response.data, id: threadId });
    } catch (error) {
      setError('Error fetching thread details for editing. Please try again.');
    }
  };
  

  const updateThread = async () => {
    try {
      if (!editThread.id) {
        setError('No thread selected for update.');
        return;
      }

       await axios.put(`http://localhost:8081/threads/threads/update/${editThread.id}`, {
        title: editThread.title,
        content: editThread.content,
        courseId: editThread.courseId,
        userId: editThread.userId,
      });

      await fetchThreads();
      setEditThread({ title: '', content: '', id: null }); 
    } catch (error) {
      setError('Error updating thread. Please try again.');
    }
  };

  const handleDeleteClick = async (threadId) => {
    if (window.confirm('Are you sure you want to delete this thread?')) {
      try {
        await axios.delete(`http://localhost:8081/threads/threads/delete/${threadId}`);
        await fetchThreads();
      } catch (error) {
        setError('Error deleting thread. Please try again.');
      }
    }
  };

  return (
    <div className="create-thread-container">
      <h2>Create Thread</h2>
      <h3>Your Threads:</h3>

      {/* Error message */}
      {error && <p className="error-message">{error}</p>}

      {Array.isArray(threads) && threads.length > 0 ? (
        <ul className="thread-list">
          {threads.map((thread) => (
            <li key={thread.ThreadID} className="thread-item">
              <p className="thread-title">Title: {thread.ThreadTitle}</p>
              <p className="thread-content">Content: {thread.ThreadContent}</p>
              <div className="flex justify-right">
                <button className="edit-button" onClick={() => handleEditClick(thread.ThreadID)}>
                  Edit
                </button>
                <button className="delete-button" onClick={() => handleDeleteClick(thread.ThreadID)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No threads available.</p>
      )}

      {editThread.id && (
        <div className="edit-thread">
          <h3>Edit Thread</h3>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={editThread.title}
              onChange={(e) => setEditThread({ ...editThread, title: e.target.value })}
            />
          </label>
          <label>
            Content:
            <textarea
              name="content"
              value={editThread.content}
              onChange={(e) => setEditThread({ ...editThread, content: e.target.value })}
            />
          </label>
          <button onClick={updateThread} className="update-button">
            Update Thread
          </button>
        </div>
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
