import * as React from 'react';
import { Button, Typography, styled, List, ListItem } from '@mui/material';

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  '&.MuiButton-outlinedPrimary': {
    borderColor: theme.palette.primary.main,
  },
}));

function ThreadList({ threads, onThreadSelect }) {
  console.log(threads); 
  
  const threadArray = Array.isArray(threads) ? threads : [];

  return (
    <div>
      <Typography variant="h3" component="div" gutterBottom>
        Thread List
      </Typography>
      <List>
        {threadArray.map((thread) => (
          <ListItem key={thread.ThreadID}>
            <StyledButton onClick={() => onThreadSelect(thread.ThreadID)}>
              {thread.ThreadTitle || 'Untitled Thread'}
            </StyledButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default ThreadList;
