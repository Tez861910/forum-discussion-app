import React, { useState, useEffect } from 'react';
import { Button, Typography, List, ListItem, Paper, CircularProgress, Box } from '@mui/material';
import useApi from '../home-page/Api';

const ThreadList = ({ threads, onThreadSelect }) => {
  const [loadingUsernames, setLoadingUsernames] = useState(true);
  const [usernamesMap, setUsernamesMap] = useState({});
  const { api } = useApi();

  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const userIds = Array.from(new Set(threads.map((thread) => thread.UserID)));
        const usernamesResponse = await api.post('/users/getUsernames', { userIds });
        const usernames = usernamesResponse.data.usernames;

        const usernameMap = {};
        userIds.forEach((userId) => {
          usernameMap[userId] = usernames[userId] || 'Unknown User';
        });

        setUsernamesMap(usernameMap);
        setLoadingUsernames(false);
      } catch (error) {
        console.error('Error fetching usernames for threads:', error);
        // Handle error gracefully, maybe show a notification to the user
      }
    };

    if (threads.length > 0) {
      fetchUsernames();
    }
  }, [api, threads]);

  return (
    <Paper elevation={3} sx={{ padding: 2, mt: 2 }}>
      <Typography variant="h4" component="div" gutterBottom>
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
                color="primary"
                fullWidth
                onClick={() => onThreadSelect(thread.ThreadID)}
                sx={{ textTransform: 'none', justifyContent: 'space-between', textAlign: 'left', my: 1 }}
              >
                <Box>
                  <Typography variant="h6">
                    {thread.ThreadTitle || 'Untitled Thread'}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary" align="right">
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

export default ThreadList;
