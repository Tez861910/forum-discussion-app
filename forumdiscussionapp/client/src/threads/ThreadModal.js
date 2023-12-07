import * as React from 'react';
import { startTransition } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, styled, Card, CardContent, CardHeader, Box } from '@mui/material';
import CommentSection from './comment-section';
import useApi from '../home-page/Api';

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  '&.MuiButton-outlinedPrimary': {
    borderColor: theme.palette.primary.main,
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

function ThreadModal({ courseId, threadId, onClose, roleId, userId }) {
  const [thread, setThread] = React.useState({ title: '', content: '' });
  const [editedTitle, setEditedTitle] = React.useState('');
  const [editedContent, setEditedContent] = React.useState('');

  const { api } = useApi();

  React.useEffect(() => {
    const fetchThread = async () => {
      try {
        if (threadId) {
          const response = await api.get(`/threads/threads/getThread/${threadId}`);
          const threadData = response.data?.thread;
  
          console.log('API Response:', response.data);
  
          if (threadData) {
            console.log('Thread Data:', threadData);
            startTransition(() => {
              setThread(threadData);
              setEditedTitle(threadData.ThreadTitle || '');
              setEditedContent(threadData.ThreadContent || '');
            });
          } else {
            console.error('Thread data not found');
          }
        }
      } catch (error) {
        console.error('Error fetching thread:', error);
      }
    };
  
    fetchThread();
  }, [api, threadId]);

  const isEditable = roleId === '2';

  const handleSaveChanges = async () => {
    try {
      await api.put(`/threads/threads/update/${threadId}`, {
        title: editedTitle,
        content: editedContent,
        userId: userId,
        courseId: courseId,
      });

      const response = await api.get(`/threads/threads/getthread/${threadId}`);
      const updatedThreadData = response.data?.thread;

      if (updatedThreadData) {
        startTransition(() => {
          setThread(updatedThreadData);
        });
      } else {
        console.error('Updated thread data not found');
      }
    } catch (error) {
      console.error('Error updating thread:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/threads/threads/delete/${threadId}`);
      onClose();
    } catch (error) {
      console.error('Error deleting thread:', error);
    }
  };

  return (
    <Dialog open={!!threadId} onClose={onClose} fullWidth maxWidth="md">
      {threadId && (
        <>
          <DialogTitle>{thread.title}</DialogTitle>
          <DialogContent dividers>
            <StyledCard>
              <CardHeader title="Thread Details" />
              <CardContent>
                <TextField
                  label="Title"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  disabled={!isEditable}
                  InputProps={{ style: { color: isEditable ? 'inherit' : 'black', opacity: isEditable ? 1 : 0.7 } }}
                  fullWidth
                />
                <TextField
                  label="Content"
                  multiline
                  rows={4}
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  disabled={!isEditable}
                  InputProps={{ style: { color: isEditable ? 'inherit' : 'black', opacity: isEditable ? 1 : 0.7 } }}
                  fullWidth
                />
              </CardContent>
            </StyledCard>
            <Box sx={{ overflow: 'auto', maxHeight: '50vh' }}>
              <CommentSection threadId={threadId} roleId={roleId} userId={userId} courseId={courseId} />
            </Box>
          </DialogContent>
          <DialogActions>
            {isEditable && (
              <>
                <StyledButton variant="contained" color="secondary" onClick={handleDelete}>
                  Delete
                </StyledButton>
                <StyledButton variant="contained" onClick={handleSaveChanges}>
                  Save Changes
                </StyledButton>
              </>
            )}
            <StyledButton variant="contained" onClick={onClose}>
              Close
            </StyledButton>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}

export default ThreadModal;
