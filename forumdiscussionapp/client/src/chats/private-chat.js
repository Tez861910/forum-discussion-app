import React, { useState, useEffect } from "react";
import { useApi } from "../home-page/Api";
import {
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  Grid,
} from "@mui/material";

const MessageComponent = ({
  message,
  userId,
  onEdit,
  onDelete,
  onReadReceipt,
}) => (
  <Box sx={{ marginBottom: 2 }} key={message.MessageID}>
    <Typography>{message.MessageContent}</Typography>
    {userId === message.SenderID && (
      <Box>
        <Button onClick={() => onEdit(message.MessageID)}>Edit</Button>
        <Button onClick={() => onDelete(message.MessageID)}>Delete</Button>
      </Box>
    )}
    {userId !== message.SenderID && !message.IsRead && (
      <Button onClick={() => onReadReceipt(message.MessageID)}>
        Mark as Read
      </Button>
    )}
  </Box>
);

export const PrivateChat = () => {
  const userId = localStorage.getItem("userId");

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [userStatus, setUserStatus] = useState({
    IsOnline: false,
    LastOnline: null,
  });
  const [friendRequests, setFriendRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [availableUsers, setAvailableUsers] = useState([]);
  const { api } = useApi();

  useEffect(() => {
    fetchMessages();
    fetchUserStatus();
    fetchFriendRequests();
    fetchFriends();
    fetchAvailableUsers();
  }, [userId]);

  const fetchMessages = () => {
    api
      .get(`/messages/privatemessages//get/user/${userId}`)
      .then((response) => setMessages(response.data))
      .catch((error) => console.error("Error fetching messages:", error));
  };

  const fetchUserStatus = () => {
    api
      .get(`/messages/userstatus/get/${userId}`)
      .then((response) => setUserStatus(response.data))
      .catch((error) => console.error("Error fetching user status:", error));
  };

  const fetchFriendRequests = () => {
    api
      .get(`/messages/friendrequests/get/${userId}`)
      .then((response) => setFriendRequests(response.data))
      .catch((error) =>
        console.error("Error fetching friend requests:", error)
      );
  };

  const fetchFriends = () => {
    api
      .get(`/messages/friends/get/${userId}`)
      .then((response) => setFriends(response.data))
      .catch((error) => console.error("Error fetching friends:", error));
  };

  const fetchAvailableUsers = () => {
    api
      .get(`/users/users/get`)
      .then((response) => setAvailableUsers(response.data))
      .catch((error) =>
        console.error("Error fetching available users:", error)
      );
  };

  const sendFriendRequest = (receiverId) => {
    api
      .post(`/messages/friendrequests/create`, {
        senderId: userId,
        receiverId: receiverId,
      })
      .then(() => {
        setSnackbarMessage("Friend request sent successfully");
        setSnackbarOpen(true);
      })
      .catch((error) => console.error("Error sending friend request:", error));
  };

  const acceptFriendRequest = (requestId) => {
    api
      .put(`/api/friend-requests/accept/${requestId}`)
      .then(() => {
        setSnackbarMessage("Friend request accepted successfully");
        setSnackbarOpen(true);
        fetchFriends();
        fetchFriendRequests();
      })
      .catch((error) =>
        console.error("Error accepting friend request:", error)
      );
  };

  const rejectFriendRequest = (requestId) => {
    api
      .delete(`/api/friend-requests/reject/${requestId}`)
      .then(() => {
        setSnackbarMessage("Friend request rejected successfully");
        setSnackbarOpen(true);
        fetchFriendRequests();
      })
      .catch((error) =>
        console.error("Error rejecting friend request:", error)
      );
  };

  const sendMessage = () => {
    if (editingMessageId) {
      api
        .put(`/messages/privatemessages/update/${editingMessageId}`, {
          message: newMessage,
        })
        .then((response) => {
          setMessages((oldMessages) =>
            oldMessages.map((message) =>
              message.MessageID === editingMessageId ? response.data : message
            )
          );
          setEditingMessageId(null);
          setNewMessage("");
          setSnackbarMessage("Message updated successfully");
          setSnackbarOpen(true);
        })
        .catch((error) => console.error("Error updating message:", error));
    } else {
      api
        .post(`/messages/privatemessages/create/${userId}`, {
          message: newMessage,
        })
        .then((response) => {
          setMessages((oldMessages) => [...oldMessages, response.data]);
          setNewMessage("");
          setSnackbarMessage("Message sent successfully");
          setSnackbarOpen(true);
        })
        .catch((error) => console.error("Error sending message:", error));
    }
  };

  const editMessage = (messageId) => {
    const messageToEdit = messages.find(
      (message) => message.MessageID === messageId
    );
    if (messageToEdit && userId === messageToEdit.SenderID) {
      setEditingMessageId(messageId);
      setNewMessage(messageToEdit.MessageContent);
    }
  };

  const deleteMessage = (messageId) => {
    api
      .delete(`/messages/privatemessages/delete/${messageId}`)
      .then(() => {
        setMessages((oldMessages) =>
          oldMessages.filter((message) => message.MessageID !== messageId)
        );
        setSnackbarMessage("Message deleted successfully");
        setSnackbarOpen(true);
      })
      .catch((error) => console.error("Error deleting message:", error));
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleReadReceipt = (messageId) => {
    api
      .post(`/messages/readreceipts/create/${messageId}/${userId}`)
      .then(() => {
        // Optionally update the UI to indicate that the message has been read
      })
      .catch((error) => console.error("Error sending read receipt:", error));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h4">Private Chat</Typography>
      <Typography>{`User Status: ${
        userStatus.IsOnline ? "Online" : "Offline"
      }`}</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          {Array.isArray(messages) ? (
            messages.map((message) => (
              <MessageComponent
                key={message.MessageID}
                message={message}
                userId={userId}
                onEdit={editMessage}
                onDelete={deleteMessage}
                onReadReceipt={handleReadReceipt}
              />
            ))
          ) : (
            <Typography>No messages available</Typography>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          {/* Available Users */}
          <Typography variant="h5">Available Users</Typography>
          {Array.isArray(availableUsers) ? (
            availableUsers.map((user) => (
              <Box key={user.UserID} sx={{ marginBottom: 2 }}>
                <Typography>{user.UserName}</Typography>
                {!friendRequests.some(
                  (request) => request.ReceiverID === user.UserID
                ) &&
                  !friends.some(
                    (friend) =>
                      friend.UserID1 === user.UserID ||
                      friend.UserID2 === user.UserID
                  ) && (
                    <Button onClick={() => sendFriendRequest(user.UserID)}>
                      Send Friend Request
                    </Button>
                  )}
              </Box>
            ))
          ) : (
            <Typography>No available users</Typography>
          )}
          {/* Friend Requests */}
          <Typography variant="h5">Friend Requests</Typography>
          {Array.isArray(friendRequests) ? (
            friendRequests.map((request) => (
              <Box key={request.RequestID} sx={{ marginBottom: 2 }}>
                <Typography>{`Friend request from ${request.SenderID}`}</Typography>
                <Button onClick={() => acceptFriendRequest(request.RequestID)}>
                  Accept
                </Button>
                <Button onClick={() => rejectFriendRequest(request.RequestID)}>
                  Reject
                </Button>
              </Box>
            ))
          ) : (
            <Typography>No friend requests available</Typography>
          )}
        </Grid>
      </Grid>
      <TextField
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        variant="outlined"
        label="New Message"
        sx={{ marginBottom: 2 }}
      />
      <Button variant="contained" onClick={sendMessage}>
        {editingMessageId ? "Update" : "Send"}
      </Button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Box>
  );
};
