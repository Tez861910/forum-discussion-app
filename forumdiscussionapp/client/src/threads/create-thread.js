import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import './create-thread.css';

function CreateThread() {
  const [threads, setThreads] = useState([]);
  const [newThread, setNewThread] = useState({
    title: 'New Thread Title',
    content: 'New Thread Content',
  });
  const [courseId, setCourseId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);
  const [courseIds, setCourseIds] = useState([]);

  const [editThreadId, setEditThreadId] = useState(null);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [confirmationDialogMessage, setConfirmationDialogMessage] = useState('');
  const [deletionThreadID, setDeletionThreadID] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (!storedUserId) {
      console.error('User ID not found in local storage');
      return;
    }
  
    const userIdNumber = parseInt(storedUserId, 10);
    setUserId(userIdNumber);
  
    let storedCourseIds;
    try {
      const storedCourseIdsString = localStorage.getItem('courseIds') || '[]';
      storedCourseIds = JSON.parse(storedCourseIdsString);
  
      if (!Array.isArray(storedCourseIds)) {
        throw new Error('Course IDs not an array');
      }
    } catch (error) {
      console.error('Error parsing or retrieving course IDs from local storage:', error.message);
      storedCourseIds = [];
    }
  
    console.log('Stored Course IDs:', storedCourseIds);
    setCourseIds(storedCourseIds);
  
    const courseIdNumber = storedCourseIds.length > 0 ? storedCourseIds[0] : null;
    setCourseId(courseIdNumber);
  
    console.log('Fetching threads for courseIds:', storedCourseIds);
    fetchThreads(storedCourseIds);
  }, []);
  
  

  const fetchThreads = async (courseIds) => {
    try {
      if (courseIds.length === 0) {
        console.error('No course IDs available for fetching threads.');
        return;
      }
  
      const response = await axios.get(`http://localhost:8081/threads/threads/get/${courseIds.join(',')}`);
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
        courseIds: [courseId], 
        userId: userId,
      });
  
      await fetchThreads(courseIds);
      setNewThread({
        title: 'New Thread Title',
        content: 'New Thread Content',
      });
    } catch (error) {
      setError('Error creating thread. Please try again.');
    }
  };
  

  const toggleEdit = (threadId) => {
    setEditThreadId(threadId);
  };

  const cancelEdit = () => {
    setEditThreadId(null);
  };

  const cancelThread = () => {
    setEditThreadId(null);
    setNewThread({
      title: 'New Thread Title',
      content: 'New Thread Content',
    });
  };

  const updateThread = async (threadId) => {
    const threadToUpdate = threads.find((thread) => thread.ThreadID === threadId);
  
    try {
      await axios.put(`http://localhost:8081/threads/threads/update/${threadId}`, {
        title: threadToUpdate.ThreadTitle,
        content: threadToUpdate.ThreadContent,
        courseIds: [courseId], 
        userId: userId,
      });
  
      await fetchThreads(courseIds);
      setEditThreadId(null);
    } catch (error) {
      setError('Error updating thread. Please try again.');
    }
  };
  

  const confirmDelete = (threadId) => {
    setDeletionThreadID(threadId);
    setConfirmationDialogMessage('Are you sure you want to delete this thread?');
    setConfirmationDialogOpen(true);
  };

  const handleDeleteClick = async () => {
    try {
      await axios.delete(`http://localhost:8081/threads/threads/delete/${deletionThreadID}`);
      await fetchThreads(courseIds);
      setConfirmationDialogOpen(false);
    } catch (error) {
      setError('Error deleting thread. Please try again.');
    }
  };

  const cancelDelete = () => {
    setConfirmationDialogOpen(false);
    setDeletionThreadID(null);
  };

  return (
    <div className="create-thread-container">
      <Link to="/home" style={{ textDecoration: 'none', color: 'blue', marginBottom: '10px' }}>
        Back to Home
      </Link>
      <Typography variant="h2">Create Thread</Typography>
      <Typography variant="h3">Your Threads:</Typography>

      {error && <Typography className="error-message">{error}</Typography>}

      {Array.isArray(threads) && threads.length > 0 ? (
        <ul className="thread-list">
          {threads.map((thread) => (
            <li key={thread.ThreadID} className="thread-item">
              {editThreadId === thread.ThreadID ? (
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
                  <Button variant="contained" color="secondary" onClick={cancelEdit}>
                    Cancel
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
              <Button variant="contained" color="secondary" onClick={() => confirmDelete(thread.ThreadID)}>
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
        <TextField label="Title" name="title" value={newThread.title} onChange={handleInputChange} />
        <TextField
          label="Content"
          name="content"
          multiline
          rows={4}
          value={newThread.content}
          onChange={handleInputChange}
        />
        <div>
          <Button variant="contained" color="primary" onClick={createNewThread}>
            Create Thread
          </Button>
          <Button variant="contained" color="secondary" onClick={cancelThread}>
            Cancel Thread
          </Button>
          {editThreadId === null ? null : (
            <Button variant="contained" color="secondary" onClick={cancelEdit}>
              Cancel Edit
            </Button>
          )}
        </div>
      </div>

      <Dialog open={confirmationDialogOpen} onClose={cancelDelete}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <Typography>{confirmationDialogMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteClick} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateThread;
