import React, { useState, useEffect, useCallback } from "react";
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
  hello,
} from "@mui/material";
import {
  Close as CloseIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useApi } from "../home-page/Api";

const ResponseCard = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
}));

export const Responses = ({ commentId, open, onClose }) => {
  const roleId = localStorage.getItem("roleId");
  const userId = localStorage.getItem("userId");
  const [responses, setResponses] = useState([]);
  const [usernamesMap, setUsernamesMap] = useState({});
  const [newResponse, setNewResponse] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editingResponse, setEditingResponse] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const { api } = useApi();

  const fetchResponses = useCallback(async () => {
    try {
      const response = await api.get(`/forums/responses/get/${commentId}`);
      const { responses } = response.data;
      const retrievedResponses = Array.isArray(responses) ? responses : [];

      setResponses(retrievedResponses);
      setFetchError(null);
    } catch (error) {
      console.error("Error fetching responses:", error);
      setFetchError("Error loading responses");
    }
  }, [api, commentId]);

  const handleResponseSubmit = async (event) => {
    event.preventDefault();

    if (commentId && newResponse.trim() !== "") {
      try {
        await api.post(`/forums/responses/create/${commentId}`, {
          content: newResponse,
          userId,
        });

        setNewResponse("");
        await fetchResponses();
      } catch (error) {
        console.error("Error adding response:", error);
        // Handle error gracefully, maybe show a notification to the user
      }
    }
  };

  const handleEditResponse = async (responseId) => {
    try {
      await api.put(`/forums/responses/update/${responseId}`, {
        content: editedContent,
      });

      await fetchResponses();
      setEditingResponse(null);
      setEditedContent("");
    } catch (error) {
      console.error("Error updating response:", error);
      // Handle error gracefully, maybe show a notification to the user
    }
  };

  const handleDeleteResponse = async (responseId) => {
    try {
      await api.delete(`/forums/responses/delete/${responseId}`);
      await fetchResponses();
    } catch (error) {
      console.error("Error deleting response:", error);
      // Handle error gracefully, maybe show a notification to the user
    }
  };

  const fetchUsernames = useCallback(
    async (responsesToFetchUsernames) => {
      try {
        const userIds = Array.from(
          new Set(responsesToFetchUsernames.map((response) => response.UserID))
        );

        if (userIds.length > 0) {
          const usernamesResponse = await api.post(
            "/users/users/getUsernames",
            {
              userIds,
            }
          );
          const usernames = usernamesResponse.data.usernames;

          setUsernamesMap(usernames);
        }
      } catch (error) {
        console.error("Error fetching usernames:", error);
        // Handle error gracefully, maybe show a notification to the user
      }
    },
    [api]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await fetchResponses();
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching responses:", error);
      }
    };

    fetchData();
  }, [fetchResponses]);

  useEffect(() => {
    if (responses.length > 0) {
      fetchUsernames(responses);
    }
  }, [responses, fetchUsernames]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: "palette.info.main",
          color: "palette.info.contrastText",
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: "typography.fontWeightBold" }}>
        Responses
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
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
                    sx={{
                      width: "100%",
                      marginBottom: 2,
                      fontWeight: "typography.fontWeightBold",
                    }}
                  />
                  <Button
                    onClick={() => handleEditResponse(response?.ResponseID)}
                    sx={{ fontWeight: "typography.fontWeightBold" }}
                  >
                    <SaveIcon /> Save
                  </Button>
                  <Button
                    onClick={() => setEditingResponse(null)}
                    sx={{ fontWeight: "typography.fontWeightBold" }}
                  >
                    <CloseIcon /> Cancel
                  </Button>
                </Box>
              ) : (
                <>
                  <Typography
                    variant="body1"
                    mb={2}
                    sx={{ fontWeight: "typography.fontWeightBold" }}
                  >
                    {response?.ResponseContent}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    mb={2}
                    sx={{ fontWeight: "typography.fontWeightBold" }}
                  >
                    {usernamesMap[response?.UserID] || "Unknown User"}
                  </Typography>
                  {(roleId === "2" || userId === response?.UserID) && (
                    <Box sx={{ mt: 1 }}>
                      <Button
                        onClick={() => {
                          setEditingResponse(response?.ResponseID);
                          setEditedContent(response?.ResponseContent);
                        }}
                        sx={{ fontWeight: "typography.fontWeightBold" }}
                      >
                        <EditIcon />
                      </Button>
                      <Button
                        onClick={() =>
                          handleDeleteResponse(response?.ResponseID)
                        }
                        sx={{ fontWeight: "typography.fontWeightBold" }}
                      >
                        <DeleteIcon />
                      </Button>
                    </Box>
                  )}
                </>
              )}
            </ResponseCard>
          ))
        )}

        {(roleId === "2" || roleId === "3") && (
          <form onSubmit={handleResponseSubmit}>
            <TextareaAutosize
              value={newResponse}
              onChange={(e) => setNewResponse(e.target.value)}
              aria-label="new response"
              minRows={4}
              placeholder="Add a new response..."
              sx={{
                width: "100%",
                marginTop: 2,
                fontWeight: "typography.fontWeightBold",
              }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ marginTop: 2, fontWeight: "typography.fontWeightBold" }}
            >
              Submit
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
