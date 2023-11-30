import * as React from 'react';
import { startTransition } from 'react';
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

function ForumDiscussion({ selectedCourse: courseId}) {
  const [threads, setThreads] = React.useState([]);
  const [selectedThread, setSelectedThread] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const roleId = localStorage.getItem('roleId');
  const userId = localStorage.getItem('userId');
  const [newThreadTitle, setNewThreadTitle] = React.useState('');
  const [newThreadContent, setNewThreadContent] = React.useState('');
  const [showCreateModal, setShowCreateModal] = React.useState(false);

  const fetchThreads = React.useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8081/threads/threads/get/${courseId}`);
      console.log('API Response:', response.data);
      startTransition(() => {
        setThreads(response.data[0]); 
      });
    } catch (error) {
      console.error('Error fetching threads:', error);
    }
  }, [courseId, userId]);

  React.useEffect(() => {
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
      const response = await axios.post('http://localhost:8081/threads/threads/create', {
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
