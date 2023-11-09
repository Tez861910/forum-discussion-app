import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root');

const CourseEnrollmentModal = ({ isOpen, onRequestClose, onEnrollSuccess }) => {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
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
    };

    if (isOpen) {
      fetchCourses();
    }
  }, [isOpen]);

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

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Course Enrollment Modal"
    >
      <h2>Enroll in Courses</h2>
      <div>
        {courses.map((course) => (
          <label key={course.CourseID}>
            <input
              type="checkbox"
              checked={selectedCourses.includes(course.CourseID)}
              onChange={() => handleCourseSelection(course.CourseID)}
            />
            {course.CourseName}
          </label>
        ))}
      </div>
      <button onClick={handleEnroll}>Enroll</button>
      <button onClick={onRequestClose}>Cancel</button>
    </Modal>
  );
};

export default CourseEnrollmentModal;