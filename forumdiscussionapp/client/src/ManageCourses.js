import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ManageCourses({ userRole }) {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8081/courses')
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
      });
  }, []);

  const handleCreateCourse = async () => {
    // Check if the user is an admin before creating a course
    if (userRole !== 'admin') {
      console.error('Only admin users can create courses.');
      return;
    }

    try {
      await axios.post('http://localhost:8081/courses', { courseName: newCourse });
      // Optionally, you can refresh the courses list or provide feedback to the user.
      // Example: setNewCourse(''); or fetch courses again.
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  return (
    <div>
      <h2>Manage Courses</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.courseID}>{course.courseName}</li>
        ))}
      </ul>
      {userRole === 'admin' && (
        <div>
          <input
            type="text"
            value={newCourse}
            onChange={(e) => setNewCourse(e.target.value)}
            placeholder="Add a new course..."
          />
          <button onClick={handleCreateCourse}>Create Course</button>
        </div>
      )}
    </div>
  );
}

export default ManageCourses;
