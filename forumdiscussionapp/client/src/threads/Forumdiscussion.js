import React, {
  useState,
  useEffect,
  useCallback,
  startTransition,
} from "react";
import {
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from "@mui/material";
import ThreadList from "./ThreadList";
import ThreadModal from "./ThreadModal";
import useApi from "../home-page/Api";

export function ForumDiscussion({ selectedCourse: courseId }) {
  const roleId = localStorage.getItem("roleId");
  const userId = localStorage.getItem("userId");
  const [threads, setThreads] = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newThreadTitle, setNewThreadTitle] = useState("");
  const [newThreadContent, setNewThreadContent] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { api } = useApi();

  const fetchThreads = useCallback(async () => {
    try {
      const response = await api.get(`/threads/threads/get/${courseId}`);
      startTransition(() => {
        setThreads(response.data[0]);
      });
    } catch (error) {
      console.error("Error fetching threads:", error);
      throw error;
    }
  }, [api, courseId]);

  useEffect(() => {
    fetchThreads();
  }, [fetchThreads, courseId]);

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
      const response = await api.post("/threads/threads/create", {
        title: newThreadTitle,
        content: newThreadContent,
        courseId,
        userId,
      });

      setSelectedThread(response.data.threadId);

      setShowCreateModal(false);

      setNewThreadTitle("");
      setNewThreadContent("");
      fetchThreads();
    } catch (error) {
      console.error("Error creating thread:", error);
    }
  };

  return (
    <Box
      sx={{
        my: 3,
        padding: 3,
        backgroundColor: "primary.main",
        color: "primary.contrastText",
      }}
    >
      <Typography
        variant="h4"
        component="div"
        gutterBottom
        sx={{ fontWeight: "bold", color: "primary.contrastText" }}
      >
        Forum Discussion
      </Typography>
      {roleId === "2" && (
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenCreateModal}
            sx={{ mb: 2, fontWeight: "bold" }}
          >
            Create Thread
          </Button>
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
        </Box>
      )}
      <ThreadList
        threads={threads}
        onThreadSelect={handleThreadSelection}
        roleId={roleId}
      />
      {selectedThread && showModal && (
        <ThreadModal
          threadId={selectedThread}
          onClose={handleModalClose}
          roleId={roleId}
          courseId={courseId}
        />
      )}
    </Box>
  );
}
