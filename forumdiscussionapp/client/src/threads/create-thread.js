import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, TextField, Button } from '@mui/material';

function CreateThread() {
  const [threads, setThreads] = useState([]);
  const [newThread, setNewThread] = useState({
    title: 'New Thread Title',
    content: 'New Thread Content',
  });
  const [courseId, setCourseId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (!storedUserId) {
      console.error('User ID not found in local storage');
      return;
    }

    const userIdNumber = parseInt(storedUserId, 10);
    setUserId(userIdNumber);

    const storedCourseId = localStorage.getItem('courseId');
    if (!storedCourseId) {
      console.error('Course ID not found in local storage');
      return;
    }

    const courseIdNumber = parseInt(storedCourseId, 10);
    setCourseId(courseIdNumber);

    fetchThreads(courseIdNumber);
  }, []);

  const fetchThreads = async (courseId) => {
    try {
      const response = await axios.get(`http://localhost:8081/threads/threads/get/${courseId}`);
      setThreads(response.data[0]);
    } catch (error) {
      setError('Error fetching threads. Please try again.');
    }
  };

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

      await fetchThreads(courseId);
      setNewThread({ title: '', content: '' });
    } catch (error) {
      setError('Error creating thread. Please try again.');
    }
  };

  const toggleEdit = (threadId) => {
    setThreads((prevThreads) =>
      prevThreads.map((thread) => ({
        ...thread,
        isEditing: thread.ThreadID === threadId ? !thread.isEditing : thread.isEditing,
      }))
    );
  };

  const updateThread = async (threadId) => {
    const threadToUpdate = threads.find((thread) => thread.ThreadID === threadId);

    try {
      await axios.put(`http://localhost:8081/threads/threads/update/${threadId}`, {
        title: threadToUpdate.ThreadTitle,
        content: threadToUpdate.ThreadContent,
        courseId: courseId,
        userId: userId,
      });

      await fetchThreads(courseId);
    } catch (error) {
      setError('Error updating thread. Please try again.');
    }
  };

  const handleDeleteClick = async (threadId) => {
    if (window.confirm('Are you sure you want to delete this thread?')) {
      try {
        await axios.delete(`http://localhost:8081/threads/threads/delete/${threadId}`);
        await fetchThreads(courseId);
      } catch (error) {
        setError('Error deleting thread. Please try again.');
      }
    }
  };

  return (
    <div className="create-thread-container">
      <Typography variant="h2">Create Thread</Typography>
      <Typography variant="h3">Your Threads:</Typography>

      {error && <Typography className="error-message">{error}</Typography>}

      {Array.isArray(threads) && threads.length > 0 ? (
  <ul className="thread-list">
    {threads.map((thread) => (
      <li key={thread.ThreadID} className="thread-item">
        {thread.isEditing ? (
          <div>
            <TextField
              label="Title"
              name="title"
              value={thread.ThreadTitle}
              onChange={(e) => {
                const updatedThreads = threads.map((t) =>
                  t.ThreadID === thread.ThreadID ? { ...t, ThreadTitle: e.target.value } : t
                );
                setThreads(updatedThreads);
              }}
            />
            <TextField
              label="Content"
              name="content"
              multiline
              rows={4}
              value={thread.ThreadContent}
              onChange={(e) => {
                const updatedThreads = threads.map((t) =>
                  t.ThreadID === thread.ThreadID ? { ...t, ThreadContent: e.target.value } : t
                );
                setThreads(updatedThreads);
              }}
            />
            <Button variant="contained" color="primary" onClick={() => updateThread(thread.ThreadID)}>
              Update
            </Button>
          </div>
        ) : (
          <div>
            <div>
              <Typography variant="h4">Title:</Typography>
              <Typography>{thread.ThreadTitle}</Typography>
            </div>
            <div>
              <Typography variant="h4">Content:</Typography>
              <Typography>{thread.ThreadContent}</Typography>
            </div>
            <Button variant="contained" color="primary" onClick={() => toggleEdit(thread.ThreadID)}>
              Edit
            </Button>
          </div>
        )}
        <Button variant="contained" color="secondary" onClick={() => handleDeleteClick(thread.ThreadID)}>
          Delete
        </Button>
      </li>
    ))}
  </ul>
) : (
  <Typography>No threads available.</Typography>
)}


      <div className="create-new-thread">
        <Typography variant="h3">Create New Thread</Typography>
        <TextField
          label="Title"
          name="title"
          value={newThread.title}
          onChange={handleInputChange}
        />
        <TextField
          label="Content"
          name="content"
          multiline
          rows={4}
          value={newThread.content}
          onChange={handleInputChange}
        />
        <Button variant="contained" color="primary" onClick={createNewThread}>
          Create Thread
        </Button>
      </div>
    </div>
  );
}

export default CreateThread;
