import React, { useState } from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';

const CreateRoleSection = ({ handleCreateRole }) => {
  const [newRoleName, setNewRoleName] = useState('');

  const handleCreate = () => {
    if (newRoleName.trim() !== '') {
      handleCreateRole(newRoleName.trim());
      setNewRoleName('');
    }
  };

  return (
    <Box sx={{ marginBottom: 2 }}>
      <Typography variant="h6" sx={{ marginBottom: 1 }}>
        Create Role
      </Typography>
      <TextField
        type="text"
        label="Role Name"
        variant="outlined"
        fullWidth
        value={newRoleName}
        onChange={(e) => setNewRoleName(e.target.value)}
        size="small"
        sx={{ marginBottom: 1 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreate}
        size="small"
      >
        Create
      </Button>
    </Box>
  );
};

export default CreateRoleSection;
