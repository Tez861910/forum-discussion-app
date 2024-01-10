import React, { useState, useEffect, useCallback } from "react";
import {
  Typography,
  TextareaAutosize,
  Box,
  styled,
  IconButton,
  CircularProgress,
} from "@mui/material";
import {
  Send as SendIcon,
  Close as CloseIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useApi } from "../home-page/Api";

const ReplyItem = styled(Box)(({ theme }) => ({
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

export const ReplySection = ({ postId }) => {
  const roleId = localStorage.getItem("roleId");
  const userId = localStorage.getItem("userId");
  const [replies, setReplies] = useState([]);
  const [usernamesMap, setUsernamesMap] = useState({});
  const [newReply, setNewReply] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editingReply, setEditingReply] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const { api } = useApi();

  const fetchReplies = useCallback(async () => {
    try {
      const response = await api.get(`/forums/reply/get/${postId}`);
      const responseData = response.data;

      console.log("Response Data:", responseData);

      if (responseData) {
        const replies = Array.isArray(responseData)
          ? responseData
          : [responseData];
        setReplies(replies);
        setFetchError(null);
        return replies;
      } else {
        setFetchError("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching replies:", error);
      setFetchError("Error loading replies");
    }
  }, [api, postId]);

  const fetchUsernames = useCallback(
    async (repliesToFetchUsernames) => {
      try {
        const userIds = Array.from(
          new Set(repliesToFetchUsernames.map((reply) => reply?.UserID))
        );
        const usernamesResponse = await api.post("/users/users/getUsernames", {
          userIds,
        });
        const usernames = usernamesResponse.data?.usernames || {};

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

  const createReply = async () => {
    if (postId && newReply.trim() !== "") {
      try {
        await api.post(`/forums/reply/create/${postId}`, {
          replyContent: newReply,
          userId,
        });

        setNewReply("");
      } catch (error) {
        console.error("Error adding reply:", error);
      }
    }
  };

  const editReply = async (replyId) => {
    try {
      const editedReply = replies.find(
        (reply) => reply?.ForumReplyID === replyId
      );

      if (editedReply) {
        await api.put(`/forums/reply/update/${replyId}`, {
          //userId,
          replyContent: editedContent,
        });

        setEditingReply(null);
        setEditedContent("");
      } else {
        console.error("Reply not found for editing:", replyId);
      }
    } catch (error) {
      console.error("Error updating reply:", error);
    }
  };

  const deleteReply = async (replyId) => {
    try {
      await api.delete(`/forums/reply/delete/${replyId}`);
    } catch (error) {
      console.error("Error deleting reply:", error);
    }
  };

  const handleReplySubmit = async (event) => {
    event.preventDefault();
    await createReply();
    const newReplies = await fetchReplies();
    fetchUsernames(newReplies);
  };

  const handleEditReply = async (replyId) => {
    await editReply(replyId);
    await fetchReplies();
    await fetchUsernames(replies);
  };

  const handleDeleteReply = async (replyId) => {
    await deleteReply(replyId);
    await fetchReplies();
    await fetchUsernames(replies);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const newReplies = await fetchReplies();

        // Log the replies after the state has been updated
        console.log("Replies in useEffect:", newReplies);

        if (newReplies) {
          await fetchUsernames(newReplies);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setFetchError("Error loading data");
        setIsLoading(false);
      }
    };

    fetchData();
  }, [fetchReplies, fetchUsernames, postId]);

  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: "warning.main",
        color: "warning.contrastText",
      }}
    >
      <Typography variant="h2" sx={{ fontWeight: "bold" }}>
        Reply Section
      </Typography>

      {fetchError && <p>{fetchError}</p>}

      {(roleId === "2" || roleId === "3") && (
        <form onSubmit={handleReplySubmit}>
          <TextareaAutosize
            value={newReply}
            onChange={(e) => setNewReply(e.target.value)}
            aria-label="new reply"
            minRows={4}
            placeholder="Add a reply..."
            sx={{ width: "100%", marginTop: 2, fontWeight: "bold" }}
          />
          {newReply.trim() !== "" && (
            <>
              <IconButton type="submit" color="primary">
                <SendIcon />
              </IconButton>
              <IconButton onClick={() => setNewReply("")}>
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
          {replies.map((reply) => (
            <ReplyItem key={reply?.ForumReplyID}>
              {editingReply === reply?.ForumReplyID ? (
                <Box>
                  <TextareaAutosize
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    aria-label="edit reply"
                    minRows={4}
                    placeholder="Edit your reply..."
                    sx={{ width: "100%", marginBottom: 2, fontWeight: "bold" }}
                  />
                  <IconButton
                    onClick={() => handleEditReply(reply?.ForumReplyID)}
                  >
                    <SaveIcon />
                  </IconButton>
                  <IconButton onClick={() => setEditingReply(null)}>
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
                    {reply?.ReplyContent}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ fontWeight: "bold" }}
                  >
                    by {usernamesMap[reply?.UserID] ?? "Unknown User"}
                  </Typography>
                  {(roleId === "2" ||
                    (roleId === "3" && userId === reply?.UserID)) && (
                    <EditDeleteWrapper>
                      <IconButton
                        onClick={() => {
                          setEditingReply(reply?.ForumReplyID);
                          setEditedContent(reply?.ReplyContent);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteReply(reply?.ForumReplyID)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </EditDeleteWrapper>
                  )}
                </>
              )}
            </ReplyItem>
          ))}
        </Box>
      )}
    </Box>
  );
};
