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
  CircularProgress,
  Grid,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import UsersModal from './CourseUserModal.js';
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
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8081/courses/courses/get');
      if (Array.isArray(response.data.courses)) {
        const transformedCourses = response.data.courses.map((row) => ({
          CourseID: row.CourseID,
          CourseName: row.CourseName,
        }));
        setCourses(transformedCourses);
      } else {
        console.error('Invalid response data format (Courses):', response.data);
        setError('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      setError('Error fetching courses. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCourse = async () => {
    try {
      const response = await axios.post('http://localhost:8081/courses/courses/create', { courseName: newCourseName });
      console.log('Create Course Response:', response.data);
      setNewCourseName('');
      fetchCourses();
    } catch (error) {
      console.error('Error creating course:', error);
      setError('Error creating course. Please try again.');
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
      fetchCourses();
    } catch (error) {
      console.error('Error updating course:', error);
      setError('Error updating course. Please try again.');
    }
  };

  const handleDeleteCourse = async (courseId) => {
    setDeleteConfirmation({ open: true, courseId });
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8081/courses/courses/delete/${deleteConfirmation.courseId}`);
      console.log('Course deleted successfully');
      fetchCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
      setError('Error deleting course. Please try again.');
    } finally {
      setDeleteConfirmation({ open: false, courseId: null });
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmation({ open: false, courseId: null });
  };

  const handleCourseSelection = (courseId) => {
    setSelectedCourseId(courseId);
    setUserModalOpen(true);
  };

  const handleCloseUserModal = () => {
    setUserModalOpen(false);
  };

  const renderCourseListItem = (course) => {
    const isEditing = editingCourseId === course.CourseID;

    return (
      <ListItem key={course.CourseID} divider>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={isEditing ? 6 : 8} onClick={() => handleCourseSelection(course.CourseID)}>
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
              <ListItemText primary={course.CourseName} />
            )}
          </Grid>
          <Grid item xs={isEditing ? 6 : 4}>
            {isEditing ? (
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                  onClick={() => handleEditCourse(course.CourseID)}
                  size="small"
                  style={{ marginRight: 8 }}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<CloseIcon />}
                  onClick={() => setEditingCourseId(null)}
                  size="small"
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="edit" onClick={() => setEditingCourseId(course.CourseID)} size="small">
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteCourse(course.CourseID)} size="small">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            )}
          </Grid>
        </Grid>
      </ListItem>
    );
  };

  return (
    <div className="admin-courses-container">
      <Typography variant="h4" style={{ marginBottom: 16 }}>
        Manage Courses
      </Typography>
      {error && <Typography variant="body1" color="error" style={{ marginBottom: 16 }}>{error}</Typography>}
      {loading && <CircularProgress style={{ marginBottom: 16 }} />}
      <div style={{ marginBottom: 16 }}>
        <Typography variant="h6" style={{ marginBottom: 8 }}>
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
          style={{ marginBottom: 8 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateCourse}
          size="small"
          style={{ marginLeft: 8 }}
        >
          Create
        </Button>
      </div>
      <List>
        {courses.length > 0 ? (
          courses.map((course) => renderCourseListItem(course))
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
          <Button onClick={cancelDelete} color="primary" size="small">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="secondary" size="small">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {userModalOpen && (
        <UsersModal
          onClose={handleCloseUserModal}
          selectedCourseId={selectedCourseId}
          open={userModalOpen}
        />
      )}
    </div>
  );
}

export default AdminCourses;
