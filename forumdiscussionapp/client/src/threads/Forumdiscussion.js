import React, { useState, useEffect, useCallback , startTransition } from 'react';
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
import useApi from '../home-page/Api';

function ForumDiscussion({ selectedCourse: courseId}) {
  const roleId = localStorage.getItem('roleId');
  const userId = localStorage.getItem('userId');
  const [threads, setThreads] = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newThreadTitle, setNewThreadTitle] = useState('');
  const [newThreadContent, setNewThreadContent] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { api } = useApi();

  const fetchThreads = useCallback(async () => {
    try {
      const response = await api.get(`/threads/threads/get/${courseId}`);
      console.log('API Response:', response.data);
      startTransition(() => {
        setThreads(response.data[0]); 
      });
    } catch (error) {
      console.error('Error fetching threads:', error);
      throw error; 
    }
  }, [api, courseId]);

  useEffect(() => {
    fetchThreads();
  }, [fetchThreads]);

  const handleThreadSelection = (threadId) => {
    setSelectedThread(threadId);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    fetchThreads(); 
  };

  const handleOpenCreateModal = () => {
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  const handleCreateThread = async () => {
    try {
      const response = await api.post('/threads/threads/create', {
        title: newThreadTitle,
        content: newThreadContent,
        courseId,
        userId,
      });

      setSelectedThread(response.data.threadId);

      setShowCreateModal(false);

      setNewThreadTitle('');
      setNewThreadContent('');
      fetchThreads();
    } catch (error) {
      console.error('Error creating thread:', error);
    }
  };

  return (
    <Box sx={{ my: 3 }}>
      <Typography variant="h2" component="div" gutterBottom>
        Forum Discussion
      </Typography>
      {roleId === '2' && (
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleOpenCreateModal} sx={{ mb: 2 }}>
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
      <ThreadList  threads={threads} onThreadSelect={handleThreadSelection} roleId={roleId} />
      {selectedThread && showModal && <ThreadModal threadId={selectedThread} onClose={handleModalClose} roleId={roleId} courseId={courseId} />}
    </Box>
  );
}

export default ForumDiscussion;
