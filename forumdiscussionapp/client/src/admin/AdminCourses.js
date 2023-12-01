import * as React from 'react';
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
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import CourseUserModal from './CourseUserModal';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AdminCourses() {
  const [courses, setCourses] = React.useState([]);
  const [newCourseName, setNewCourseName] = React.useState('');
  const [editingCourseId, setEditingCourseId] = React.useState(null);
  const [updatedCourseName, setUpdatedCourseName] = React.useState('');
  const [deleteConfirmation, setDeleteConfirmation] = React.useState({ open: false, courseId: null });
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [userModalOpen, setUserModalOpen] = React.useState(false);
  const [selectedCourseId, setSelectedCourseId] = React.useState(null);

  React.useEffect(() => {
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
      await axios.patch(`http://localhost:8081/courses/courses/delete/${deleteConfirmation.courseId}`);
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

  const handleEditCourseModal = (courseId) => {
    setEditingCourseId(courseId);
    setUpdatedCourseName(courses.find(course => course.CourseID === courseId).CourseName);
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
                onClick={() => handleCourseSelection(course.CourseID)}
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
                <IconButton edge="end" aria-label="edit" onClick={() => handleEditCourseModal(course.CourseID)} size="small">
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
    <Box sx={{ padding: 2, backgroundColor: 'background.default', minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Admin Courses Management
      </Typography>
      {error && <Typography variant="body1" color="error" sx={{ marginBottom: 2 }}>{error}</Typography>}
      {loading && <CircularProgress sx={{ marginBottom: 2 }} />}
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
          <Button onClick={cancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      {userModalOpen && (
        <CourseUserModal
          onClose={handleCloseUserModal}
          selectedCourseId={selectedCourseId}
          open={userModalOpen}
        />
      )}
    </Box>
  );
}

export default AdminCourses;