import * as React from 'react';
import { ListItem, Grid, TextField, Button, ListItemText, Typography, ListItemSecondaryAction, IconButton, Box, Modal } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import GroupIcon from '@mui/icons-material/Group';

function CourseListItem({ course, handleEditCourse, handleDeleteCourse, handleCourseUserModal }) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [updatedCourseName, setUpdatedCourseName] = React.useState(course.CourseName);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSaveEdit = () => {
    handleEditCourse(course.CourseID, updatedCourseName);
    setIsEditing(false);
    handleClose();
  };

  return (
    <ListItem key={course.CourseID} divider>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={8}>
          <ListItemText
            primary={course.CourseName}
            onClick={() => handleCourseUserModal(course.CourseID)}
            sx={{ cursor: 'pointer', color: 'primary.main' }}
          />
        </Grid>
        <Grid item xs={4}>
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              aria-label="edit"
              color="primary"
              onClick={handleOpen}
              size="small"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="delete"
              color="secondary"
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
               <GroupIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ 
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
         }}>
          <Typography variant="h6" sx={{ marginBottom: 1 }} id="modal-modal-title">
            Edit Course
          </Typography>
          <TextField
            type="text"
            value={updatedCourseName}
            onChange={(e) => setUpdatedCourseName(e.target.value)}
            fullWidth
            variant="outlined"
            size="small"
            id="modal-modal-description"
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, marginTop: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClose}
              size="small"
              sx={{ textTransform: 'none' }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSaveEdit}
              size="small"
              sx={{ textTransform: 'none' }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </ListItem>
  );
}

export default React.memo(CourseListItem);
