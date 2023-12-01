import React from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';

function CreateCourseSection({ handleCreateCourse, newCourseName, setNewCourseName }) {
  return (
    <Box sx={{ marginBottom: 2 }}>
      <Typography variant="h6" sx={{ marginBottom: 1 }}>
        Create Course
      </Typography>
      <TextField
        type="text"
        label="Course Name"
        variant="outlined"
        fullWidth
        value={newCourseName}
        onChange={(e) => setNewCourseName(e.target.value)}
        size="small"
        sx={{ marginBottom: 1 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateCourse}
        size="small"
      >
        Create
      </Button>
    </Box>
  );
}

export default CreateCourseSection;
