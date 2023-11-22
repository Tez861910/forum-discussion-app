import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, TextField } from '@mui/material';

function ThreadModal({ threadId, onClose, role }) {
  const [thread, setThread] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');

  useEffect(() => {
    const fetchThread = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/threads/threads/get/${threadId}`);
        setThread(response.data.thread);
        setEditedTitle(response.data.thread.title);
        setEditedContent(response.data.thread.content);
      } catch (error) {
        console.error('Error fetching thread:', error);
      }
    };

    fetchThread();
  }, [threadId]);

  const handleSaveChanges = async () => {
    try {
      // Make API call to update thread on the server
      await axios.put(`http://localhost:8081/threads/threads/update/${threadId}`, {
        title: editedTitle,
        content: editedContent,
      });

      // Fetch the updated thread data
      const response = await axios.get(`http://localhost:8081/threads/threads/get/${threadId}`);
      setThread(response.data.thread);
    } catch (error) {
      console.error('Error updating thread:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8081/threads/threads/delete/${threadId}`);
      onClose();
    } catch (error) {
      console.error('Error deleting thread:', error);
    }
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>{thread && thread.title}</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
        />
        <TextField
          label="Content"
          multiline
          rows={4}
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        {role === '2' && (
          <Button variant="contained" color="secondary" onClick={handleDelete}>
            Delete
          </Button>
        )}
        <Button variant="contained" onClick={handleSaveChanges}>
          Save Changes
        </Button>
        <Button variant="contained" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ThreadModal;
