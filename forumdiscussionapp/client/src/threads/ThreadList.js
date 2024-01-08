import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  List,
  ListItem,
  Paper,
  CircularProgress,
  Box,
} from "@mui/material";
import { useApi } from "../home-page/Api";

export const ThreadList = ({ threads, onThreadSelect }) => {
  const [loadingUsernames, setLoadingUsernames] = useState(true);
  const [usernamesMap, setUsernamesMap] = useState({});
  const { api } = useApi();

  const fetchUsernames = async () => {
    try {
      const userIds = Array.from(
        new Set(threads.map((thread) => thread.UserID))
      );
      const usernamesResponse = await api.post("/users/getUsernames", {
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
                onClick={() => onThreadSelect(thread.ThreadID)}
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
    </Paper>
  );
};
