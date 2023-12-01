import React, { useState } from 'react';
import {
  ListItem,
  Grid,
  TextField,
  Button,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

function CourseListItem({
  course,
  handleEditCourse,
  handleDeleteCourse,
  handleCourseUserModal,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedCourseName, setUpdatedCourseName] = useState(course.CourseName);

  const handleSaveEdit = () => {
    setUpdatedCourseName((prevName) => {
      handleEditCourse(course.CourseID, prevName);
      setIsEditing(false);
      return prevName;
    });
  };

  return (
    <ListItem key={course.CourseID} divider>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={isEditing ? 6 : 8}>
          {isEditing ? (
            <TextField
              type="text"
              value={updatedCourseName}
              onChange={(e) => setUpdatedCourseName(e.target.value)}
              fullWidth
              variant="outlined"
              size="small"
            />
          ) : (
            <ListItemText
              primary={course.CourseName}
              onClick={() => handleCourseUserModal(course.CourseID)}
              sx={{ cursor: 'pointer', color: 'primary.main' }}
            />
          )}
        </Grid>
        <Grid item xs={isEditing ? 6 : 4}>
          {isEditing ? (
            <div>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                onClick={handleSaveEdit}
                size="small"
                style={{ marginRight: 8 }}
              >
                Save
              </Button>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<CloseIcon />}
                onClick={() => setIsEditing(false)}
                size="small"
              >
                Cancel
              </Button>
            </div>
          ) : (
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => setIsEditing(true)}
                size="small"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDeleteCourse(course.CourseID)}
                size="small"
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="users"
                onClick={() => handleCourseUserModal(course.CourseID)}
                size="small"
              >
                {/* Add appropriate icon for managing users in the course */}
              </IconButton>
            </ListItemSecondaryAction>
          )}
        </Grid>
      </Grid>
    </ListItem>
  );
}

export default CourseListItem;
