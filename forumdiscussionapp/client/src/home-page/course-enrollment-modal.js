import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { InputAdornment, TextField, List, ListItem, Checkbox, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

Modal.setAppElement('#root');

const CourseEnrollmentModal = ({ isOpen, onRequestClose, onEnrollSuccess }) => {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [userCourses, setUserCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8081/courses/courses/get');

      if (response.status === 200) {
        const filteredCourses = response.data.courses.filter(
          (course) => !selectedCourses.includes(course.CourseID)
        );

        setCourses(filteredCourses);
      } else {
        console.error('Failed to fetch courses:', response.status);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchUserCourses = async () => {
    try {
      const userId = localStorage.getItem('userId');

      if (!userId) {
        console.error('User ID not found in local storage');
        return [];
      }

      const response = await axios.get('http://localhost:8081/users/usercourses/get', {
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
  };

  const fetchUserCoursesAndSetState = async () => {
    const userCoursesData = await fetchUserCourses();
    setUserCourses(userCoursesData);

    // Set the initial state of selectedCourses based on user's enrolled courses
    const enrolledCourseIds = userCoursesData.map((course) => course.CourseID);
    setSelectedCourses(enrolledCourseIds);
  };

  useEffect(() => {
    if (isOpen) {
      fetchCourses();
      fetchUserCoursesAndSetState();
    }
  }, [isOpen, selectedCourses]);

  const handleEnroll = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8081/home/enroll-courses',
        {
          userId: localStorage.getItem('userId'),
          courses: selectedCourses,
        }
      );

      if (response.status === 200) {
        onEnrollSuccess(selectedCourses);
      } else {
        console.error('Enrollment failed:', response.status);
      }
    } catch (error) {
      console.error('Error enrolling in courses:', error);
    }
  };

  const handleCourseSelection = (courseId) => {
    if (selectedCourses.includes(courseId)) {
      setSelectedCourses(selectedCourses.filter((id) => id !== courseId));
    } else {
      setSelectedCourses([...selectedCourses, courseId]);
    }
  };

  const filteredCourses = courses.filter((course) =>
    course.CourseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <h2>Enroll in Courses</h2>
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
        {filteredCourses.map((course) => (
          <ListItem key={course.CourseID} disablePadding>
            <Checkbox
              checked={selectedCourses.includes(course.CourseID)}
              onChange={() => handleCourseSelection(course.CourseID)}
            />
            {course.CourseName}
          </ListItem>
        ))}
      </List>
      <Button variant="contained" onClick={handleEnroll} sx={{ marginRight: 2 }}>
        Enroll
      </Button>
      <Button variant="outlined" onClick={onRequestClose} sx={{ marginRight: 2 }}>
        Cancel
      </Button>
      <Button variant="outlined" onClick={fetchUserCoursesAndSetState}>
        Show Enrolled Courses
      </Button>
      {userCourses.length > 0 && (
        <div>
          <h3>Enrolled Courses:</h3>
          <ul>
            {userCourses.map((course) => (
              <li key={course.CourseID}>{course.CourseName}</li>
            ))}
          </ul>
        </div>
      )}
    </Modal>
  );
};

export default CourseEnrollmentModal;
