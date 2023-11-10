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
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [courseEnrollments, setCourseEnrollments] = useState([]);
  const [newUserName, setNewUserName] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      setError('Error fetching courses. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchCourseEnrollments = async (courseId) => {
    try {
      const response = await axios.get(`http://localhost:8081/courses/courses/enrollments/${courseId}`);
      if (response.status === 404) {
        console.error('No enrollments found for the course:', response.data.error);
        setCourseEnrollments([]);
        return;
      }
  
      // Check if the response has the expected structure
      if (response.data && typeof response.data.enrollments === 'object') {
        const enrollmentsData = response.data.enrollments;
        
        // Flatten the object into an array of enrollments
        const enrollmentsArray = Object.values(enrollmentsData).flatMap((enrollments) =>
  enrollments.map((username) => ({ UserName: username, UserID: enrollmentsData[username] }))
);

  
        setCourseEnrollments(enrollmentsArray);
      } else {
        console.error('Invalid response data format for course enrollments:', response.data);
      }
    } catch (error) {
      console.error('Error fetching course enrollments:', error);
      setError('Error fetching course enrollments');
    }
  };
  

  useEffect(() => {
    if (selectedCourseId !== null) {
      console.log('Fetching course enrollments for course ID:', selectedCourseId);
      fetchCourseEnrollments(selectedCourseId);
    }
  }, [selectedCourseId]);

  const handleCreateCourse = async () => {
    try {
      const response = await axios.post('http://localhost:8081/courses/courses/create', { courseName: newCourseName });
      console.log('Create Course Response:', response.data);
      setNewCourseName('');
      console.log('Course created successfully');
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
      console.log('Course updated successfully');
      fetchCourses();
    } catch (error) {
      console.error('Error updating course:', error);
      setError('Error updating course. Please try again.');
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
        setError('Error deleting course');
      })
      .finally(() => {
        setDeleteConfirmation({ open: false, courseId: null });
      });
  };

  const cancelDelete = () => {
    setDeleteConfirmation({ open: false, courseId: null });
  };

  const handleAddUserToCourse = async () => {
    try {
      const response = await axios.post(`http://localhost:8081/courses/courses/${selectedCourseId}/enroll`, { userName: newUserName });
      console.log('Enroll User Response:', response.data);
      setNewUserName('');
      fetchCourseEnrollments(selectedCourseId);
    } catch (error) {
      console.error('Error enrolling user to course:', error);
      setError('Error enrolling user to course');
    }
  };

  const handleRemoveUserFromCourse = async (enrollment) => {
    try {
      const userId = enrollment.UserID;
      if (!userId) {
        console.error('UserID not found in the enrollment object:', enrollment);
        return;
      }
  
      const response = await axios.delete(
        `http://localhost:8081/courses/courses/${selectedCourseId}/enrollments/${userId}`
      );
      console.log('Remove User Response:', response.data);
      fetchCourseEnrollments(selectedCourseId);
    } catch (error) {
      console.error('Error removing user from course:', error);
      setError('Error removing user from course');
    }
  };
  
  const handleCourseSelection = async (courseId) => {
    console.log('Selected Course ID:', courseId);
    setSelectedCourseId(courseId);
    await fetchCourseEnrollments(courseId);
  };

  return (
    <div className="admin-courses-container">
      <Typography variant="h4">Manage Courses</Typography>
      {error && <Typography variant="body1" color="error">{error}</Typography>}
      {loading && <CircularProgress />}
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
            <ListItem key={course.CourseID} divider onClick={() => handleCourseSelection(course.CourseID)}>
              {editingCourseId === course.CourseID ? (
                <div className="edit-course-container">
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
                </div>
              ) : (
                <div className="course-info-container">
                  <ListItemText primary={course.CourseName} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="edit" onClick={() => setEditingCourseId(course.CourseID)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteCourse(course.CourseID)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </div>
              )}
             {selectedCourseId === course.CourseID && (
  <div className="enrollments-container">
    <Typography variant="subtitle1" className="enrollments-header">
      Enrollments
    </Typography>
    <List>
      {courseEnrollments.map((enrollment, index) => (
       <ListItem key={`${enrollment.UserName}-${index}`} className="enrollment-item">
       <ListItemText primary={enrollment.UserName.UserName} /> 
       <ListItemSecondaryAction>
       <IconButton
  edge="end"
  aria-label="delete"
  onClick={() => handleRemoveUserFromCourse(enrollment)}
>
  <DeleteIcon />
</IconButton>
       </ListItemSecondaryAction>
     </ListItem>
     
      ))}
      <ListItem className="add-user-container">
        <TextField
          type="text"
          label="User Name"
          variant="outlined"
          fullWidth
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleAddUserToCourse}>
          Enroll User
        </Button>
      </ListItem>
    </List>
  </div>
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