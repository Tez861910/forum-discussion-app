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

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8081/courses/courses/get');

        if (response.status === 200) {
          // Filter out the courses that are already selected/enrolled
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

    if (isOpen) {
      fetchCourses();
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

  const filteredCourses = courses.filter(course =>
    course.CourseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Course Enrollment Modal"
      style={{
        content: {
          width: '400px', // Set the width as per your design
          margin: 'auto', // Center the modal horizontally
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
      <Button variant="outlined" onClick={onRequestClose}>
        Cancel
      </Button>
    </Modal>
  );
};

export default CourseEnrollmentModal;
