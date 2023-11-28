import React from 'react';
import { Button, Typography } from '@mui/material';

function ThreadList({ threads, onThreadSelect, roleId }) {
  console.log(threads); 
  
  const threadArray = Array.isArray(threads) ? threads : [];

  return (
    <div className="thread-list">
      <Typography variant="h3">Thread List</Typography>
      <ul>
        {threadArray.map((thread) => (
          <li key={thread.ThreadID}>
            <Button onClick={() => onThreadSelect(thread.ThreadID)}>
              {thread.ThreadTitle || 'Untitled Thread'}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ThreadList;
