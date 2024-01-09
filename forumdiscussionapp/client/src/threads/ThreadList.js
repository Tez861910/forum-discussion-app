import React, { useState, useEffect, useCallback } from "react";
import {
  Button,
  Typography,
  List,
  ListItem,
  Paper,
  CircularProgress,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { useApi } from "../home-page/Api";
import { ThreadModal } from "./ThreadModal";

export const ThreadList = ({ forumId }) => {
  const roleId = localStorage.getItem("roleId");
  const userId = localStorage.getItem("userId");
  const [loadingUsernames, setLoadingUsernames] = useState(true);
  const [usernamesMap, setUsernamesMap] = useState({});
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newThreadTitle, setNewThreadTitle] = useState("");
  const [newThreadContent, setNewThreadContent] = useState("");
  const [selectedThread, setSelectedThread] = useState(null);
  const [threads, setThreads] = useState([]);
  const { api } = useApi();

  const fetchThreads = useCallback(async () => {
    try {
      const response = await api.get(`/forums/threads/get/${forumId}`);
      setThreads(response.data); // Assuming the threads are directly in the response data array
    } catch (error) {
      console.error("Error fetching threads:", error);
      throw error;
    }
  }, [api, forumId]);

  useEffect(() => {
    fetchThreads();
  }, [fetchThreads, forumId]);

  const fetchUsernames = async () => {
    try {
      const userIds = Array.from(
        new Set(threads.map((thread) => thread.UserID))
      );
      const usernamesResponse = await api.post("/users/users/getUsernames", {
        userIds,
      });
      const usernames = usernamesResponse.data.usernames;

      const usernameMap = {};
      userIds.forEach((userId) => {
        usernameMap[userId] = usernames[userId] || "Unknown User";
      });

      setUsernamesMap(usernameMap);
      setLoadingUsernames(false);
    } catch (error) {
      console.error("Error fetching usernames for threads:", error);
    }
  };

  const handleOpenCreateModal = () => {
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  const handleCreateThread = async () => {
    try {
      const response = await api.post("/forums/threads/create", {
        title: newThreadTitle,
        content: newThreadContent,
        forumId,
        userId,
      });

      setSelectedThread(response.data.threadId);

      setShowCreateModal(false);

      setNewThreadTitle("");
      setNewThreadContent("");
      fetchUsernames();
    } catch (error) {
      console.error("Error creating thread:", error);
    }
  };

  const handleThreadSelection = (threadId) => {
    setSelectedThread(threadId);
  };

  useEffect(() => {
    if (threads.length > 0 && loadingUsernames) {
      fetchUsernames();
    }
  }, [api, threads, loadingUsernames]);

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        mt: 2,
        backgroundColor: "secondary.main",
        color: "secondary.contrastText",
      }}
    >
      <Typography
        variant="h3"
        component="div"
        gutterBottom
        sx={{ fontWeight: "bold" }}
      >
        Thread List
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenCreateModal}
        sx={{ mb: 2, fontWeight: "bold" }}
      >
        Create Thread
      </Button>
      {/* Create Thread Dialog */}
      <Dialog
        open={showCreateModal}
        onClose={handleCloseCreateModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: "bold", color: "primary.main" }}>
          Create New Thread
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Thread Title"
            value={newThreadTitle}
            onChange={(e) => setNewThreadTitle(e.target.value)}
            fullWidth
            margin="dense"
            sx={{ fontWeight: "bold", color: "text.primary" }}
          />
          <TextField
            label="Thread Content"
            multiline
            rows={4}
            value={newThreadContent}
            onChange={(e) => setNewThreadContent(e.target.value)}
            fullWidth
            margin="dense"
            sx={{ fontWeight: "bold", color: "text.primary" }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseCreateModal}
            color="error"
            sx={{ fontWeight: "bold" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreateThread}
            color="info"
            sx={{ fontWeight: "bold" }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>

      <List>
        {loadingUsernames ? (
          <CircularProgress />
        ) : (
          threads.map((thread) => (
            <ListItem key={thread.ThreadID}>
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={() => {
                  handleThreadSelection(thread.ThreadID);
                }}
                sx={{
                  textTransform: "none",
                  justifyContent: "space-between",
                  textAlign: "left",
                  my: 1,
                  fontWeight: "bold",
                }}
              >
                <Box>
                  <Typography variant="h6">
                    {thread.ThreadTitle || "Untitled Thread"}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    align="right"
                    sx={{ fontWeight: "bold" }}
                  >
                    by {usernamesMap[thread.UserID]}
                  </Typography>
                </Box>
              </Button>
            </ListItem>
          ))
        )}
      </List>

      {/* Thread Modal */}
      {selectedThread && (
        <ThreadModal
          threadId={selectedThread}
          onClose={() => setSelectedThread(null)}
          roleId={roleId}
          forumId={forumId}
        />
      )}
    </Paper>
  );
};
