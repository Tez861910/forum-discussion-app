import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, TextField, Button, Typography } from "@mui/material";

export const GroupChat = ({ match }) => {
  const groupId = match.params.groupId;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [readReceipts, setReadReceipts] = useState([]);
  const loggedInUserId = localStorage.getItem("userId");

  useEffect(() => {
    // Fetch group messages
    axios
      .get(`/api/group-messages/${groupId}`)
      .then((response) => setMessages(response.data))
      .catch((error) => console.error("Error fetching messages:", error));

    // Fetch read receipts
    axios
      .get(`/api/read-receipts/${groupId}`)
      .then((response) => setReadReceipts(response.data))
      .catch((error) => console.error("Error fetching read receipts:", error));
  }, [groupId]);

  const sendMessage = () => {
    if (editingMessageId) {
      // Edit existing message
      axios
        .put(`/api/group-messages/${groupId}/${editingMessageId}`, {
          message: newMessage,
        })
        .then((response) => {
          setMessages((oldMessages) =>
            oldMessages.map((message) =>
              message.GroupMessageID === editingMessageId
                ? response.data
                : message
            )
          );
          setNewMessage("");
          setEditingMessageId(null);
        })
        .catch((error) => console.error("Error editing message:", error));
    } else {
      // Send new message
      axios
        .post(`/api/group-messages/${groupId}`, { message: newMessage })
        .then((response) => {
          setMessages((oldMessages) => [...oldMessages, response.data]);
          setNewMessage("");
        })
        .catch((error) => console.error("Error sending message:", error));
    }
  };

  const editMessage = (messageId) => {
    const messageToEdit = messages.find(
      (message) => message.GroupMessageID === messageId
    );
    if (messageToEdit) {
      setNewMessage(messageToEdit.MessageContent);
      setEditingMessageId(messageId);
    }
  };

  const deleteMessage = (messageId) => {
    axios
      .delete(`/api/group-messages/${groupId}/${messageId}`)
      .then(() => {
        setMessages((oldMessages) =>
          oldMessages.filter((message) => message.GroupMessageID !== messageId)
        );
      })
      .catch((error) => console.error("Error deleting message:", error));
  };

  const markMessageAsRead = (messageId) => {
    axios
      .post(`/api/read-receipts/${groupId}`, { messageId })
      .then((response) => {
        setReadReceipts((oldReadReceipts) => [
          ...oldReadReceipts,
          response.data,
        ]);
      })
      .catch((error) => console.error("Error marking message as read:", error));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h4">Group Chat</Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {messages.map((message) => (
          <div key={message.GroupMessageID}>
            <Typography>
              {message.MessageContent} -{" "}
              {new Date(message.Timestamp).toLocaleTimeString()}
            </Typography>
            {message.SenderID === loggedInUserId && (
              <>
                <Button onClick={() => editMessage(message.GroupMessageID)}>
                  Edit
                </Button>
                {new Date() - new Date(message.Timestamp) < 300000 && (
                  <Button onClick={() => deleteMessage(message.GroupMessageID)}>
                    Delete
                  </Button>
                )}
              </>
            )}
            {!readReceipts.some(
              (receipt) => receipt.GroupMessageID === message.GroupMessageID
            ) && (
              <Button onClick={() => markMessageAsRead(message.GroupMessageID)}>
                Mark as Read
              </Button>
            )}
          </div>
        ))}
      </Box>
      <TextField
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        variant="outlined"
        label="New Message"
      />
      <Button variant="contained" onClick={sendMessage}>
        {editingMessageId ? "Save Edit" : "Send"}
      </Button>
    </Box>
  );
};
