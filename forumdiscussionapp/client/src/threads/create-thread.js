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
import CommentSection from '../comments/comment-section';
import './create-thread.css';

function CreateThread({ courseId }) {
  const [threads, setThreads] = useState([]);
  const [newThread, setNewThread] = useState({
    title: 'New Thread Title',
    content: 'New Thread Content',
  });
  const [userId, setUserId] = useState(null);
  const [roleId, setRoleId] = useState(null);
  const [error, setError] = useState(null);
  const [editThreadId, setEditThreadId] = useState(null);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [confirmationDialogMessage, setConfirmationDialogMessage] = useState('');
  const [deletionThreadID, setDeletionThreadID] = useState(null);
  const [threadId, setThreadId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (!storedUserId) {
      console.error('User ID not found in local storage');
      return;
    }

    const storedRoleId = localStorage.getItem('roleId');
    if (!storedRoleId) {
      console.error('Role ID not found in local storage');
      return;
    }

    const userIdNumber = parseInt(storedUserId, 10);
    setUserId(userIdNumber);

    const roleIdNumber = parseInt(storedRoleId, 10);
    setRoleId(roleIdNumber);

    console.log('Fetching threads for courseId:', courseId);
    fetchThreads(courseId);
  }, [courseId]);

  const fetchThreads = async (courseId) => {
    try {
      if (!courseId) {
        console.error('No course ID available for fetching threads.');
        return;
      }

      const response = await axios.get(
        `http://localhost:8081/threads/threads/get/${courseId}`
      );
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

      await fetchThreads(courseId);
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
    const threadToUpdate = threads.find(
      (thread) => thread.threadId === threadId
    );

    try {
      await axios.put(
        `http://localhost:8081/threads/threads/update/${threadId}`,
        {
          title: threadToUpdate.threadTitle,
          content: threadToUpdate.threadContent,
          courseIds: [courseId],
          userId: userId,
        }
      );

      await fetchThreads(courseId);
      setEditThreadId(null);
    } catch (error) {
      setError('Error updating thread. Please try again.');
    }
  };

  const confirmDelete = (threadId) => {
    setDeletionThreadID(threadId);
    setConfirmationDialogMessage(
      'Are you sure you want to delete this thread?'
    );
    setConfirmationDialogOpen(true);
  };

  const handleDeleteClick = async () => {
    try {
      await axios.delete(
        `http://localhost:8081/threads/threads/delete/${deletionThreadID}`
      );
      await fetchThreads(courseId);
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
      <Link
        to="/home"
        style={{ textDecoration: 'none', color: 'blue', marginBottom: '10px' }}
      >
        Back to Home
      </Link>
      <Typography variant="h2">Create Thread</Typography>
      <Typography variant="h3">Your Threads:</Typography>

      {error && <Typography className="error-message">{error}</Typography>}

      {Array.isArray(threads) && threads.length > 0 ? (
        <ul className="thread-list">
          {threads.map((thread) => (
            <li key={thread.threadId} className="thread-item">
              {editThreadId === thread.threadId ? (
                <div>
                  <TextField
                    label="Title"
                    name="title"
                    value={thread.threadTitle}
                    onChange={(e) => {
                      const updatedThreads = threads.map((t) =>
                        t.threadId === thread.threadId
                          ? { ...t, threadTitle: e.target.value }
                          : t
                      );
                      setThreads(updatedThreads);
                    }}
                  />
                  <TextField
                    label="Content"
                    name="content"
                    multiline
                    rows={4}
                    value={thread.threadContent}
                    onChange={(e) => {
                      const updatedThreads = threads.map((t) =>
                        t.threadId === thread.threadId
                          ? { ...t, threadContent: e.target.value }
                          : t
                      );
                      setThreads(updatedThreads);
                    }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => updateThread(thread.threadId)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={cancelEdit}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <div>
                  <div>
                    <Typography variant="h4">Title:</Typography>
                    <Typography>{thread.threadTitle}</Typography>
                  </div>
                  <div>
                    <Typography variant="h4">Content:</Typography>
                    <Typography>{thread.threadContent}</Typography>
                  </div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => toggleEdit(thread.threadId)}
                  >
                    Edit
                  </Button>
                </div>
              )}
              <Button
                variant="contained"
                color="secondary"
                onClick={() => confirmDelete(thread.threadId)}
              >
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
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={createNewThread}
          >
            Create Thread
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={cancelThread}
          >
            Cancel Thread
          </Button>
          {editThreadId === null ? null : (
            <Button
              variant="contained"
              color="secondary"
              onClick={cancelEdit}
            >
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

      {/* Include the CommentSection component */}
      <CommentSection roleId={roleId} courseId={courseId} threadId={threadId} />
    </div>
  );
}

export default CreateThread;
