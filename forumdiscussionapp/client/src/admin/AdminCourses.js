import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import './admincourse.css';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [newCourseName, setNewCourseName] = useState('');
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [updatedCourseName, setUpdatedCourseName] = useState('');
  const [deleteConfirmation, setDeleteConfirmation] = useState({ open: false, courseId: null });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8081/courses/courses/get');
      if (Array.isArray(response.data.courses)) {
        const transformedCourses = response.data.courses.map((row) => ({
          CourseID: row.CourseID,
          CourseName: row.CourseName,
        }));
        setCourses(transformedCourses);
      } else {
        console.error('Invalid response data format:', response.data);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleCreateCourse = async () => {
    try {
      const response = await axios.post('http://localhost:8081/courses/courses/create', { courseName: newCourseName });
      console.log('Create Course Response:', response.data);
      setNewCourseName('');
      console.log('Course created successfully');
      fetchCourses();
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  const handleEditCourse = async (courseId) => {
    try {
      const response = await axios.put(`http://localhost:8081/courses/courses/update/${courseId}`, {
        courseName: updatedCourseName,
      });
      console.log('Edit Course Response:', response.data);
      setEditingCourseId(null);
      setUpdatedCourseName('');
      console.log('Course updated successfully');
      fetchCourses();
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    setDeleteConfirmation({ open: true, courseId });
  };

  const confirmDelete = () => {
    axios
      .delete(`http://localhost:8081/courses/courses/delete/${deleteConfirmation.courseId}`)
      .then(() => {
        console.log('Course deleted successfully');
        fetchCourses();
      })
      .catch((error) => {
        console.error('Error deleting course:', error);
      })
      .finally(() => {
        setDeleteConfirmation({ open: false, courseId: null });
      });
  };

  const cancelDelete = () => {
    setDeleteConfirmation({ open: false, courseId: null });
  };

  return (
    <div className="admin-courses-container">
      <Typography variant="h4">Manage Courses</Typography>
      <div>
        <Typography variant="h6">Create Course</Typography>
        <TextField
          type="text"
          label="Course Name"
          variant="outlined"
          fullWidth
          value={newCourseName}
          onChange={(e) => setNewCourseName(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleCreateCourse}>
          Create
        </Button>
      </div>
      <List>
        {courses.length > 0 ? (
          courses.map((course) => (
            <ListItem key={course.CourseID} divider>
              {editingCourseId === course.CourseID ? (
                <>
                  <TextField
                    type="text"
                    value={updatedCourseName}
                    onChange={(e) => setUpdatedCourseName(e.target.value)}
                    className="edit-input"
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    onClick={() => handleEditCourse(course.CourseID)}
                  >
                    Save
                  </Button>
                </>
              ) : (
                <>
                  <ListItemText primary={course.CourseName} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="edit" onClick={() => setEditingCourseId(course.CourseID)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteCourse(course.CourseID)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </>
              )}
            </ListItem>
          ))
        ) : (
          courses.length === 0 ? <ListItem>No courses available</ListItem> : null
        )}
      </List>
      <Dialog
        open={deleteConfirmation.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={cancelDelete}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Are you sure you want to delete this course?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AdminCourses;
