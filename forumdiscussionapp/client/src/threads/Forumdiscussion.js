import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from '@mui/material';
import ThreadList from './ThreadList'; 
import ThreadModal from './ThreadModal';
import './forumdiscussion.css';

function ForumDiscussion({ courseId }) {
  const [threads, setThreads] = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [roleId, setRoleId] = useState(localStorage.getItem('roleId'));
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [newThreadTitle, setNewThreadTitle] = useState('');
  const [newThreadContent, setNewThreadContent] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/threads/threads/get/${courseId}`);
        console.log('API Response:', response.data);
        setThreads(response.data[0]); 
      } catch (error) {
        console.error('Error fetching threads:', error);
      }
    };

    fetchThreads();
  }, [courseId, userId]);

  const handleThreadSelection = (threadId) => {
    setSelectedThread(threadId);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleOpenCreateModal = () => {
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  const handleCreateThread = async () => {
    if (!courseId || !userId) {
      console.error('courseId and userId are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8081/threads/threads/create', {
        title: newThreadTitle,
        content: newThreadContent,
        courseId,
        userId,
      });

      const updatedThreadsResponse = await axios.get(`http://localhost:8081/threads/threads/get/${courseId}`);
      setThreads(updatedThreadsResponse.data[0]); 

      setSelectedThread(response.data.threadId);

      setShowCreateModal(false);

      setNewThreadTitle('');
      setNewThreadContent('');
    } catch (error) {
      console.error('Error creating thread:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h2">Forum Discussion</Typography>
      {roleId === '2' && (
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleOpenCreateModal}>
            Create Thread
          </Button>
          <Dialog open={showCreateModal} onClose={handleCloseCreateModal}>
            <DialogTitle>Create New Thread</DialogTitle>
            <DialogContent>
              <TextField
                label="Thread Title"
                value={newThreadTitle}
                onChange={(e) => setNewThreadTitle(e.target.value)}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Thread Content"
                multiline
                rows={4}
                value={newThreadContent}
                onChange={(e) => setNewThreadContent(e.target.value)}
                fullWidth
                margin="dense"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseCreateModal} color="primary">
                Cancel
              </Button>
              <Button onClick={handleCreateThread} color="primary">
                Create
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
      <ThreadList threads={threads} onThreadSelect={handleThreadSelection} roleId={roleId} />
      {selectedThread && showModal && <ThreadModal threadId={selectedThread} onClose={handleModalClose} roleId={roleId} userId={userId} courseId={courseId}  showModal={showModal} />}
    </Box>
  );
}

export default ForumDiscussion;
