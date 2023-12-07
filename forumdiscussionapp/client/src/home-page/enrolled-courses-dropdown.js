import React, { useState, useEffect, useCallback } from 'react';
import { Select, MenuItem, InputLabel, FormControl, Box } from '@mui/material';
import useApi from './Api';

const EnrolledCoursesDropdown = ({ onCourseSelect, onCourseChange }) => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [userCourses, setUserCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { api } = useApi();

  const handleCourseChange = (courseId) => {
    setSelectedCourse(courseId);
    onCourseSelect(courseId);
    onCourseChange(courseId);
  };

  const fetchUserCourses = useCallback(async () => {
    try {
      const userId = localStorage.getItem('userId');

      if (!userId) {
        console.error('User ID not found in local storage');
        return [];
      }

      const response = await api.get('/users/usercourses/get/id', {
        params: { userId: userId },
      });

      if (response.status === 200) {
        setUserCourses(response.data.userCourses);
      } else {
        console.error('Failed to fetch user courses:', response.status);
      }
    } catch (error) {
      console.error('Error fetching user courses:', error);
    }
  }, [api]);

  const fetchEnrolledCourses = useCallback(async () => {
    try {
      const response = await api.get('/courses/courses/get');

      if (response.status === 200) {
        setEnrolledCourses(response.data.courses);
      } else {
        console.error('Failed to fetch courses:', response.status);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  }, [api]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await Promise.all([fetchUserCourses(), fetchEnrolledCourses()]);
      setIsLoading(false);
    };

    fetchData();
  }, [fetchUserCourses, fetchEnrolledCourses]);

  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth>
        <InputLabel htmlFor="enrolled-courses-dropdown">Enrolled Courses</InputLabel>
        <Select
          label="Enrolled Courses"
          id="enrolled-courses-dropdown"
          value={selectedCourse}
          onChange={(e) => handleCourseChange(e.target.value)}
        >
          {isLoading ? (
            <MenuItem disabled>Loading...</MenuItem>
          ) : enrolledCourses.length > 0 ? (
            enrolledCourses
              .filter((enrolledCourse) =>
                userCourses.some((userCourse) => userCourse.CourseID === enrolledCourse.CourseID)
              )
              .map((enrolledCourse) => (
                <MenuItem key={enrolledCourse.CourseID} value={enrolledCourse.CourseID}>
                  {enrolledCourse.CourseName}
                </MenuItem>
              ))
          ) : (
            <MenuItem disabled>No enrolled courses</MenuItem>
          )}
        </Select>
      </FormControl>
    </Box>
  );
};

export default EnrolledCoursesDropdown;
