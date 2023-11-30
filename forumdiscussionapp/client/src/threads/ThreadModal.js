import * as React from 'react';
import { startTransition } from 'react';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, styled, Card, CardContent, CardHeader } from '@mui/material';
import CommentSection from './comment-section';

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  '&.MuiButton-outlinedPrimary': {
    borderColor: theme.palette.primary.main,
  },
}));

function ThreadModal({ courseId, threadId, onClose, roleId, userId }) {
  const [thread, setThread] = React.useState({ title: '', content: '' });
  const [editedTitle, setEditedTitle] = React.useState('');
  const [editedContent, setEditedContent] = React.useState('');

  React.useEffect(() => {
    const fetchThread = async () => {
      try {
        if (threadId) {
          const response = await axios.get(`http://localhost:8081/threads/threads/getThread/${threadId}`);
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
  }, [threadId]);

  const isEditable = roleId === '2';

  const handleSaveChanges = async () => {
    try {
      await axios.put(`http://localhost:8081/threads/threads/update/${threadId}`, {
        title: editedTitle,
        content: editedContent,
        userId: userId,
        courseId: courseId,
      });

      const response = await axios.get(`http://localhost:8081/threads/threads/getthread/${threadId}`);
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
      await axios.delete(`http://localhost:8081/threads/threads/delete/${threadId}`);
      onClose();
    } catch (error) {
      console.error('Error deleting thread:', error);
    }
  };

  return (
    <Dialog open={!!threadId} onClose={onClose}>
      {threadId && (
        <>
          <DialogTitle>{thread.title}</DialogTitle>
          <DialogContent>
            <Card>
              <CardHeader title="Thread Details" />
              <CardContent>
                <TextField
                  label="Title"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  disabled={!isEditable}
                  InputProps={{ style: { color: isEditable ? 'inherit' : 'black', opacity: isEditable ? 1 : 0.7 } }}
                />
                <TextField
                  label="Content"
                  multiline
                  rows={4}
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  disabled={!isEditable}
                  InputProps={{ style: { color: isEditable ? 'inherit' : 'black', opacity: isEditable ? 1 : 0.7 } }}
                />
              </CardContent>
            </Card>
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

          <CommentSection threadId={threadId} roleId={roleId} userId={userId} courseId={courseId} />
        </>
      )}
    </Dialog>
  );
}

export default ThreadModal;
