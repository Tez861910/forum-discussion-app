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
  styled,
  ButtonGroup,
} from '@mui/material';
import ThreadList from './ThreadList'; 
import ThreadModal from './ThreadModal';
import './forumdiscussion.css';

const StyledButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  '& .MuiButton-root': {
    margin: theme.spacing(1),
  },
  '& .MuiButton-outlinedPrimary': {
    borderColor: theme.palette.primary.main,
  },
}));

function ForumDiscussion({ selectedCourse, userId }) {
  const [threads, setThreads] = React.useState([]);
  const [selectedThread, setSelectedThread] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const roleId = localStorage.getItem('roleId');
  const [newThreadTitle, setNewThreadTitle] = React.useState('');
  const [newThreadContent, setNewThreadContent] = React.useState('');
  const [showCreateModal, setShowCreateModal] = React.useState(false);

  React.useEffect(() => {
    const fetchThreads = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/threads/threads/get/${selectedCourse}`);
        console.log('API Response:', response.data);
        startTransition(() => {
          setThreads(response.data[0]); 
        });
      } catch (error) {
        console.error('Error fetching threads:', error);
      }
    };

    fetchThreads();
  }, [selectedCourse, userId]);

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
    if (!selectedCourse || !userId) {
      console.error('selectedCourse and userId are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8081/threads/threads/create', {
        title: newThreadTitle,
        content: newThreadContent,
        courseId: selectedCourse,
        userId,
      });

      const updatedThreadsResponse = await axios.get(`http://localhost:8081/threads/threads/get/${selectedCourse}`);
      startTransition(() => {
        setThreads(updatedThreadsResponse.data[0]); 
      });

      setSelectedThread(response.data.threadId);

      setShowCreateModal(false);

      setNewThreadTitle('');
      setNewThreadContent('');
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
      <StyledButtonGroup  threads={threads} onThreadSelect={handleThreadSelection} roleId={roleId} />
      {selectedThread && showModal && <ThreadModal threadId={selectedThread} onClose={handleModalClose} roleId={roleId} userId={userId} courseId={selectedCourse}  showModal={showModal} />}
    </Box>
  );
}

export default ForumDiscussion;
