import React from 'react';
import { Button, Typography } from '@mui/material';

function ThreadList({ threads, onThreadSelect }) {
  return (
    <div className="thread-list">
      <Typography variant="h3">Thread List</Typography>
      <ul>
        {threads && threads.map((thread) => (
          <li key={thread.threadId}>
          <Button onClick={() => onThreadSelect(thread.threadId)}>
            {thread.threadTitle || 'Untitled Thread'}
          </Button>
        </li>        
        ))}
      </ul>
    </div>
  );
}

export default ThreadList;
