import React, { useState, useEffect, useCallback } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import {
  InputAdornment,
  TextField,
  List,
  ListItem,
  Checkbox,
  Button,
  Typography,
  Box,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

Modal.setAppElement('#root');

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
          {enrolledCourse.CourseName}
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
        {course.CourseName}
      </ListItem>
    ));

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Course Enrollment Modal"
      style={{
        content: {
          width: '400px',
          margin: 'auto',
        },
      }}
    >
      <Typography variant="h5" gutterBottom>
        Enroll in Courses
      </Typography>

      {enrolledCoursesList.length > 0 && (
        <div>
          <Typography variant="h6">Enrolled Courses</Typography>
          <List>{enrolledCoursesList}</List>
        </div>
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

      <List>
        {selectableCoursesList.length > 0 ? (
          selectableCoursesList
        ) : (
          <Typography variant="body2" color="textSecondary">
            No available courses for enrollment.
          </Typography>
        )}
      </List>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
        <Button variant="contained" onClick={handleEnroll} sx={{ marginRight: 2 }}>
          Enroll
        </Button>
        <Button variant="outlined" onClick={onRequestClose}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default CourseEnrollmentModal;
