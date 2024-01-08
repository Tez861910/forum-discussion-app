import React, { useState, useEffect, useCallback } from "react";
import {
  Typography,
  TextareaAutosize,
  Box,
  styled,
  IconButton,
  Button,
  CircularProgress,
} from "@mui/material";
import {
  Send as SendIcon,
  Close as CloseIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import Responses from "./Responses";
import useApi from "../home-page/Api";

const CommentItem = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  position: "relative",
}));

const EditDeleteWrapper = styled(Box)({
  marginLeft: "auto",
});

export const CommentSection = ({ threadId }) => {
  const roleId = localStorage.getItem("roleId");
  const userId = localStorage.getItem("userId");
  const [comments, setComments] = useState([]);
  const [usernamesMap, setUsernamesMap] = useState({});
  const [newComment, setNewComment] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editingComment, setEditingComment] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [selectedComment, setSelectedComment] = useState(null);
  const { api } = useApi();

  const fetchComments = useCallback(async () => {
    try {
      const response = await api.get(`/comments/comments/get/${threadId}`);
      const comments = Array.isArray(response.data.comments)
        ? response.data.comments
        : [response.data.comments];
      setComments(comments);
      setFetchError(null);
      return comments;
    } catch (error) {
      console.error("Error fetching comments:", error);
      setFetchError("Error loading comments");
    }
  }, [api, threadId]);

  const fetchUsernames = useCallback(
    async (commentsToFetchUsernames) => {
      try {
        const userIds = Array.from(
          new Set(commentsToFetchUsernames.map((comment) => comment.UserID))
        );
        const usernamesResponse = await api.post("/users/getUsernames", {
          userIds,
        });
        const usernames = usernamesResponse.data.usernames;

        const usernameMap = {};
        userIds.forEach((userId) => {
          usernameMap[userId] = usernames[userId] || "Unknown User";
        });

        setUsernamesMap((prevUsernamesMap) => ({
          ...prevUsernamesMap,
          ...usernameMap,
        }));
      } catch (error) {
        console.error("Error fetching usernames:", error);
      }
    },
    [api]
  );

  const createComment = async () => {
    if (threadId && newComment.trim() !== "") {
      try {
        await api.post(`/comments/comments/create/${threadId}`, {
          CommentContent: newComment,
          userId,
        });

        setNewComment("");
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  const editComment = async (commentId) => {
    try {
      const editedComment = comments.find(
        (comment) => comment.CommentID === commentId
      );

      if (editedComment) {
        await api.put(`/comments/comments/update/${commentId}`, {
          content: editedContent,
        });

        setEditingComment(null);
        setEditedContent("");
      } else {
        console.error("Comment not found for editing:", commentId);
      }
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await api.delete(`/comments/comments/delete/${commentId}`);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    await createComment();
    const newComments = await fetchComments();
    fetchUsernames(newComments);
  };

  const handleEditComment = async (commentId) => {
    await editComment(commentId);
    await fetchComments();
    await fetchUsernames(comments);
  };

  const handleDeleteComment = async (commentId) => {
    await deleteComment(commentId);
    await fetchComments();
    await fetchUsernames(comments);
  };

  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
      fetchComments().then(() => {
        fetchUsernames(comments);
        setIsLoading(false);
      });
    }
  }, []);

  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: "warning.main",
        color: "warning.contrastText",
      }}
    >
      <Typography variant="h2" sx={{ fontWeight: "bold" }}>
        Comment Section
      </Typography>

      {fetchError && <p>{fetchError}</p>}

      {(roleId === "2" || roleId === "3") && (
        <form onSubmit={handleCommentSubmit}>
          <TextareaAutosize
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            aria-label="new comment"
            minRows={4}
            placeholder="Add a comment..."
            sx={{ width: "100%", marginTop: 2, fontWeight: "bold" }}
          />
          {newComment.trim() !== "" && (
            <>
              <IconButton type="submit" color="primary">
                <SendIcon />
              </IconButton>
              <IconButton onClick={() => setNewComment("")}>
                <CloseIcon />
              </IconButton>
            </>
          )}
        </form>
      )}

      {isLoading ? (
        <CircularProgress />
      ) : (
        <Box sx={{ mt: 2 }}>
          {comments.map((comment) => (
            <CommentItem key={comment?.CommentID}>
              {editingComment === comment?.CommentID ? (
                <Box>
                  <TextareaAutosize
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    aria-label="edit comment"
                    minRows={4}
                    placeholder="Edit your comment..."
                    sx={{ width: "100%", marginBottom: 2, fontWeight: "bold" }}
                  />
                  <IconButton
                    onClick={() => handleEditComment(comment?.CommentID)}
                  >
                    <SaveIcon />
                  </IconButton>
                  <IconButton onClick={() => setEditingComment(null)}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              ) : (
                <>
                  <Typography
                    variant="body1"
                    mb={2}
                    sx={{ fontWeight: "bold" }}
                  >
                    {comment?.CommentContent}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ fontWeight: "bold" }}
                  >
                    by {usernamesMap[comment.UserID]}
                  </Typography>
                  {(roleId === "2" ||
                    (roleId === "3" && userId === comment?.UserID)) && (
                    <EditDeleteWrapper>
                      <IconButton
                        onClick={() => {
                          setEditingComment(comment?.CommentID);
                          setEditedContent(comment?.CommentContent);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteComment(comment?.CommentID)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </EditDeleteWrapper>
                  )}
                  <Button
                    onClick={() => setSelectedComment(comment)}
                    sx={{ fontWeight: "bold" }}
                  >
                    Responses
                  </Button>
                </>
              )}
            </CommentItem>
          ))}
        </Box>
      )}

      {selectedComment && (
        <Responses
          commentId={selectedComment.CommentID}
          open={Boolean(selectedComment)}
          onClose={() => setSelectedComment(null)}
        />
      )}
    </Box>
  );
};

export default CommentSection;
