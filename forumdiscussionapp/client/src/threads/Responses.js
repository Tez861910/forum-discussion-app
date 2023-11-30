import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, Button } from '@mui/material';

function Responses({ commentId, userId, roleId }) {
  const [responses, setResponses] = useState([]);
  const [newResponse, setNewResponse] = useState('');
  const [editingResponse, setEditingResponse] = useState(null);
  const [editedContent, setEditedContent] = useState('');

  useEffect(() => {
    fetchResponses();
  }, []);

  const fetchResponses = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/responses/get/${commentId}`);
      const responses = response.data.responses;
      return Array.isArray(responses) ? responses : [responses];  
    } catch (error) {
      console.error('Error fetching responses:', error);
      throw error; 
    }
  };

  const handleResponseSubmit = async (event) => {
    event.preventDefault();

    if (commentId && newResponse.trim() !== '') {
      try {
        await axios.post(`http://localhost:8081/responses/create/${commentId}`, {
          ResponseContent: newResponse,
          userId,
        });

        setNewResponse('');
        fetchResponses();
      } catch (error) {
        console.error('Error adding response:', error);
      }
    }
  };

  const handleEditResponse = async (responseId) => {
    try {
      await axios.put(`http://localhost:8081/responses/update/${responseId}`, {
        content: editedContent,
      });

      fetchResponses();
      setEditingResponse(null);
      setEditedContent('');
    } catch (error) {
      console.error('Error updating response:', error);
    }
  };

  const handleDeleteResponse = async (responseId) => {
    try {
      await axios.delete(`http://localhost:8081/responses/delete/${responseId}`);

      fetchResponses();
    } catch (error) {
      console.error('Error deleting response:', error);
    }
  };

  return (
    <Box className="response-list" sx={{ mt: 2 }}>
      {responses.map((response) => (
        <Box key={response?.ResponseID} className="response-item" sx={{ mb: 2 }}>
          {editingResponse === response?.ResponseID ? (
            <Box>
              <TextField
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              />
              <Button onClick={() => handleEditResponse(response?.ResponseID)}>
                Save
              </Button>
              <Button onClick={() => setEditingResponse(null)}>
                Cancel
              </Button>
            </Box>
          ) : (
            <>
              {response?.ResponseContent}
              {(roleId === '2' || (roleId === '3' && userId === response?.UserID)) && (
                <Box sx={{ mt: 1 }}>
                  <Button onClick={() => { setEditingResponse(response?.ResponseID); setEditedContent(response?.ResponseContent); }}>
                    Edit
                  </Button>
                  <Button onClick={() => handleDeleteResponse(response?.ResponseID)}>Delete</Button>
                </Box>
              )}
            </>
          )}
        </Box>
      ))}

      <form onSubmit={handleResponseSubmit}>
        <TextField
          label="New Response"
          value={newResponse}
          onChange={(event) => setNewResponse(event.target.value)}
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          sx={{ mt: 2 }}
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Submit
        </Button>
      </form>
    </Box>
  );
}

export default Responses;
