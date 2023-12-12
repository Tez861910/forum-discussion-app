import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  TextareaAutosize,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  styled,
  CircularProgress,
} from '@mui/material';
import {
  Close as CloseIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import useApi from '../home-page/Api';

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  '&.MuiButton-contained': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    maxWidth: '800px',
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  marginLeft: 'auto',
}));

const ResponseCard = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
}));

function Responses({ commentId, open, onClose }) {
  const roleId = localStorage.getItem('roleId');
  const userId = localStorage.getItem('userId');
  const [responses, setResponses] = useState([]);
  const [usernamesMap, setUsernamesMap] = useState({});
  const [newResponse, setNewResponse] = useState('');
  const [editingResponse, setEditingResponse] = useState(null);
  const [editedContent, setEditedContent] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { api } = useApi();

  const fetchResponses = useCallback(async () => {
    try {
      const response = await api.get(`/responses/responses/get/${commentId}`);
      const { responses } = response.data;

      // Ensure responses is always an array
      const retrievedResponses = Array.isArray(responses) ? responses : [];

      setResponses(retrievedResponses);
    } catch (error) {
      console.error('Error fetching responses:', error);
      // Handle error gracefully, maybe show a notification to the user
      throw error;
    }
  }, [api, commentId]);

  const fetchUsernames = useCallback(async (responsesToFetchUsernames) => {
    try {
      const userIds = Array.from(new Set(responsesToFetchUsernames.map((response) => response.UserID)));

      if (userIds.length > 0) {
        const usernamesResponse = await api.post('/users/getUsernames', { userIds });
        const usernames = usernamesResponse.data;

        const usernameMap = {};
        userIds.forEach((userId) => {
          usernameMap[userId] = usernames[userId] || 'Unknown User';
        });

        setUsernamesMap(usernameMap);
      }
    } catch (error) {
      console.error('Error fetching usernames:', error);
      // Handle error gracefully, maybe show a notification to the user
    }
  }, [api]);

  const fetchUsernamesAndResponses = useCallback(async () => {
    try {
      setIsLoading(true);

      // Fetch usernames first
      await fetchUsernames(responses);

      // Fetch responses after usernames are fetched
      await fetchResponses();

      setFetchError(null);
    } catch (error) {
      console.error('Error fetching usernames or responses:', error);
      // Handle error gracefully, maybe show a notification to the user
      setFetchError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [fetchUsernames, fetchResponses, responses]);

  useEffect(() => {
    if (open && !isLoading) {
      fetchUsernamesAndResponses();
    }
  }, [open, isLoading, fetchUsernamesAndResponses]);

  useEffect(() => {
    if (responses.length > 0) {
      fetchUsernames(responses);
    }
  }, [fetchUsernames, responses]);

  useEffect(() => {
    if (open && !isLoading) {
      setIsLoading(true);
      fetchUsernamesAndResponses().finally(() => {
        setFetchError(null);
        setIsLoading(false);
      });
    }
  }, [open, isLoading, fetchUsernamesAndResponses]);

  const handleResponseSubmit = async (event) => {
    event.preventDefault();

    if (commentId && newResponse.trim() !== '') {
      try {
        await api.post(`/responses/responses/create/${commentId}`, {
          ResponseContent: newResponse,
          userId,
        });

        setNewResponse('');
        fetchResponses();
      } catch (error) {
        console.error('Error adding response:', error);
        // Handle error gracefully, maybe show a notification to the user
      }
    }
  };

  const handleEditResponse = async (responseId) => {
    try {
      await api.put(`/responses/responses/update/${responseId}`, {
        content: editedContent,
      });

      fetchResponses();
      setEditingResponse(null);
      setEditedContent('');
    } catch (error) {
      console.error('Error updating response:', error);
      // Handle error gracefully, maybe show a notification to the user
    }
  };

  const handleDeleteResponse = async (responseId) => {
    try {
      await api.delete(`/responses/responses/delete/${responseId}`);

      fetchResponses();
    } catch (error) {
      console.error('Error deleting response:', error);
      // Handle error gracefully, maybe show a notification to the user
    }
  };

  return (
    <StyledDialog open={open} onClose={onClose}>
      <DialogTitle>
        Responses
        <StyledIconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
          <CloseIcon />
        </StyledIconButton>
      </DialogTitle>
      <DialogContent>
        {isLoading ? (
          <CircularProgress />
        ) : (
          responses.map((response) => (
            <ResponseCard key={response?.ResponseID}>
              {editingResponse === response?.ResponseID ? (
                <Box>
                  <TextareaAutosize
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    aria-label="edit response"
                    minRows={4}
                    placeholder="Edit your response..."
                    sx={{ width: '100%', marginBottom: 2 }}
                  />
                  <StyledButton onClick={() => handleEditResponse(response?.ResponseID)}>
                    <SaveIcon /> Save
                  </StyledButton>
                  <StyledButton onClick={() => setEditingResponse(null)}>
                    <CloseIcon /> Cancel
                  </StyledButton>
                </Box>
              ) : (
                <>
                  <Typography variant="body1" mb={2}>
                    {response?.ResponseContent}
                  </Typography>
                  <Typography variant="caption" color="textSecondary" mb={2}>
                    {usernamesMap[response?.UserID]}
                  </Typography>
                  {(roleId === '2' || userId === response?.UserID) && (
                    <Box sx={{ mt: 1 }}>
                      <StyledButton onClick={() => { setEditingResponse(response?.ResponseID); setEditedContent(response?.ResponseContent); }}>
                        <EditIcon />
                      </StyledButton>
                      <StyledButton onClick={() => handleDeleteResponse(response?.ResponseID)}>
                        <DeleteIcon />
                      </StyledButton>
                    </Box>
                  )}
                </>
              )}
            </ResponseCard>
          ))
        )}

        {(roleId === '2' || roleId === '3') && (
          <form onSubmit={handleResponseSubmit}>
            <TextareaAutosize
              value={newResponse}
              onChange={(e) => setNewResponse(e.target.value)}
              aria-label="new response"
              minRows={4}
              placeholder="Add a new response..."
              sx={{ width: '100%', marginTop: 2 }}
            />
            <StyledButton type="submit" variant="contained" sx={{ marginTop: 2 }}>
              Submit
            </StyledButton>
          </form>
        )}
      </DialogContent>
    </StyledDialog>
  );
}

export default Responses;
