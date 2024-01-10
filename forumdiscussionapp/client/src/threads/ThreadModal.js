import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Card,
  CardContent,
  CardHeader,
  Box,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { CommentSection } from "./comment-section";
import { useApi } from "../home-page/Api";

export function ThreadModal({
  forumId,
  threadId,
  onClose,
  roleId,
  userId,
  onThreadUpdate,
}) {
  const [thread, setThread] = React.useState({ title: "", content: "" });
  const [editedTitle, setEditedTitle] = React.useState("");
  const [editedContent, setEditedContent] = React.useState("");
  const { api } = useApi();

  React.useEffect(() => {
    const fetchThread = async () => {
      try {
        if (threadId) {
          const response = await api.get(
            `/forums/threads/getThread/${threadId}`
          );
          const threadData = response.data?.thread;

          if (threadData) {
            setThread(threadData);
            setEditedTitle(threadData.ThreadTitle || "");
            setEditedContent(threadData.ThreadContent || "");
          } else {
            console.error("Thread data not found");
          }
        }
      } catch (error) {
        console.error("Error fetching thread:", error);
      }
    };

    fetchThread();
  }, [api, threadId]);

  const isEditable = roleId === "2";

  const handleSaveChanges = async () => {
    try {
      await api.put(`/forums/threads/update/${threadId}`, {
        title: editedTitle,
        content: editedContent,
        forumId,
      });

      setThread((prevThread) => ({
        ...prevThread,
        ThreadTitle: editedTitle,
        ThreadContent: editedContent,
      }));
      onClose();
      onThreadUpdate();
    } catch (error) {
      console.error("Error updating thread:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/forums/threads/delete/${threadId}`);
      onClose();
      onThreadUpdate();
    } catch (error) {
      console.error("Error deleting thread:", error);
    }
  };

  return (
    <Dialog
      open={!!threadId}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: { backgroundColor: "background.paper", color: "text.primary" },
      }}
    >
      {threadId && (
        <>
          <DialogTitle
            sx={{
              fontWeight: "bold",
              backgroundColor: "primary.main",
              color: "primary.contrastText",
            }}
          >
            {editedTitle}
            <IconButton
              edge="end"
              color="inherit"
              onClick={onClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <Card
              sx={{ backgroundColor: "secondary.light", color: "text.primary" }}
            >
              <CardHeader title="Thread Details" />
              <CardContent>
                <TextField
                  label="Title"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  disabled={!isEditable}
                  InputProps={{
                    style: {
                      color: isEditable ? "inherit" : "black",
                      opacity: isEditable ? 1 : 0.7,
                    },
                  }}
                  fullWidth
                  sx={{ fontWeight: "bold" }}
                />
                <TextField
                  label="Content"
                  multiline
                  rows={4}
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  disabled={!isEditable}
                  InputProps={{
                    style: {
                      color: isEditable ? "inherit" : "black",
                      opacity: isEditable ? 1 : 0.7,
                    },
                  }}
                  fullWidth
                  sx={{ fontWeight: "bold" }}
                />
              </CardContent>
              <Box sx={{ overflow: "auto", maxHeight: "50vh" }}>
                <CommentSection
                  threadId={threadId}
                  roleId={roleId}
                  userId={userId}
                  forumId={forumId}
                />
              </Box>
            </Card>
          </DialogContent>
          <DialogActions>
            {isEditable && (
              <>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleDelete}
                  sx={{ fontWeight: "bold" }}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSaveChanges}
                  sx={{ fontWeight: "bold" }}
                >
                  Save Changes
                </Button>
              </>
            )}
            <Button
              variant="contained"
              onClick={onClose}
              sx={{ fontWeight: "bold" }}
            >
              Close
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}
