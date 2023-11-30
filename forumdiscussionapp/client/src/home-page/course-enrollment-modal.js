import React, { useState, useEffect, useCallback } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import axios from 'axios';

const CourseEnrollmentModal = ({ isOpen, onRequestClose, onEnrollSuccess }) => {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [userCourses, setUserCourses] = useState([]);

  const fetchCourses = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8081/courses/courses/get');

      if (response.status === 200) {
        setCourses(response.data.courses);
      } else {
        console.error('Failed to fetch courses:', response.status);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  }, []);

  const fetchUserCourses = useCallback(async () => {
    try {
      const userId = localStorage.getItem('userId');

      if (!userId) {
        console.error('User ID not found in local storage');
        return [];
      }

      const response = await axios.get('http://localhost:8081/users/usercourses/get/id', {
        params: { userId: userId },
      });

      if (response.status === 200) {
        return response.data.userCourses;
      } else {
        console.error('Failed to fetch user courses:', response.status);
        return [];
      }
    } catch (error) {
      console.error('Error fetching user courses:', error);
      return [];
    }
  }, []);

  const fetchUserCoursesAndSetState = useCallback(async () => {
    try {
      const userCoursesData = await fetchUserCourses();
      setUserCourses(userCoursesData);

      const enrolledCourseIds = userCoursesData.map((course) => course.CourseID);
      setSelectedCourses(enrolledCourseIds);
    } catch (error) {
      console.error('Error fetching user courses:', error);
    }
  }, [fetchUserCourses]);

  useEffect(() => {
    const fetchCoursesAndUserCourses = async () => {
      await Promise.all([fetchCourses(), fetchUserCoursesAndSetState()]);
    };

    if (isOpen) {
      fetchCoursesAndUserCourses();
    }
  }, [isOpen, fetchCourses, fetchUserCoursesAndSetState]);

  const handleCourseSelection = (courseId) => {
    if (selectedCourses.includes(courseId)) {
      setSelectedCourses(selectedCourses.filter((id) => id !== courseId));
    } else {
      setSelectedCourses([...selectedCourses, courseId]);
    }
  };

  const handleEnroll = async () => {
    try {
      const userId = localStorage.getItem('userId');

      if (!userId) {
        console.error('User ID not found in local storage');
        return;
      }

      // Filter out already enrolled courses
      const nonEnrolledCourses = selectedCourses.filter(
        (courseId) => !userCourses.some((userCourse) => userCourse.CourseID === courseId)
      );

      // Iterate over nonEnrolledCourses and send individual requests for each course
      for (const courseId of nonEnrolledCourses) {
        const response = await axios.post(
          `http://localhost:8081/courses/courses/${courseId}/enroll`,
          {
            userId: userId,
          }
        );

        if (response.status !== 200) {
          console.error(`Enrollment failed for course ${courseId}:`, response.status);
          return;
        }
      }

      // If all enrollments are successful
      onEnrollSuccess(nonEnrolledCourses);
      fetchUserCoursesAndSetState();
    } catch (error) {
      console.error('Error enrolling in courses:', error);
    }
  };

  const enrolledCoursesList = userCourses.map((userCourse) => {
    const enrolledCourse = courses.find((course) => course.CourseID === userCourse.CourseID);

    if (enrolledCourse) {
      return (
        <ListItem key={enrolledCourse.CourseID} disablePadding>
          <ListItemText primary={enrolledCourse.CourseName} />
        </ListItem>
      );
    } else {
      return null;
    }
  });

  const selectableCoursesList = courses
    .filter((course) => !selectedCourses.includes(course.CourseID))
    .filter((course) => course.CourseName.toLowerCase().includes(searchTerm.toLowerCase()))
    .map((course) => (
      <ListItem key={course.CourseID} disablePadding>
        <Checkbox
          checked={selectedCourses.includes(course.CourseID)}
          onChange={() => handleCourseSelection(course.CourseID)}
        />
        <ListItemText primary={course.CourseName} />
      </ListItem>
    ));

  return (
    <Dialog
      open={isOpen}
      onClose={onRequestClose}
      aria-labelledby="course-enrollment-modal-title"
      aria-describedby="course-enrollment-modal-description"
    >
      <DialogTitle id="course-enrollment-modal-title">Enroll in Courses</DialogTitle>
      <DialogContent dividers>
        {enrolledCoursesList.length > 0 && (
          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="h6">Enrolled Courses</Typography>
            <List>{enrolledCoursesList}</List>
          </Box>
        )}

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ marginBottom: 2 }}
        />

        <Typography variant="h6">Available Courses</Typography>
        <List>
          {selectableCoursesList.length > 0 ? (
            selectableCoursesList
          ) : (
            <Typography variant="body2" color="textSecondary">
              No available courses for enrollment.
            </Typography>
          )}
        </List>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleEnroll} sx={{ marginRight: 2 }}>
          Enroll
        </Button>
        <Button variant="outlined" onClick={onRequestClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CourseEnrollmentModal;
