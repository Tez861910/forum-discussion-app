import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [newCourseName, setNewCourseName] = useState('');
  const [editingcourseId, setEditingcourseId] = useState(null);
  const [updatedCourseName, setUpdatedCourseName] = useState('');

  useEffect(() => {
    // Fetch the list of courses from the server
    axios.get('http://localhost:8081/admin/courses')
      .then((response) => {
        setCourses(response.data);
        console.log('Courses fetched successfully');
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
      });
  }, []);

  const handleCreateCourse = async () => {
    try {
      await axios.post('http://localhost:8081/admin/courses', { courseName: newCourseName });
      // Refresh the list of courses after creating a new one
      setNewCourseName('');
      fetchCourses();
      console.log('Course created successfully');
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  const handleEditCourse = async (courseId) => {
    try {
      await axios.put(`http://localhost:8081/admin/courses/${courseId}`, { courseName: updatedCourseName });
      // Refresh the list of courses after updating
      setEditingcourseId(null);
      setUpdatedCourseName('');
      fetchCourses();
      console.log('Course updated successfully');
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      await axios.delete(`http://localhost:8081/admin/courses/${courseId}`);
      // Refresh the list of courses after deleting
      fetchCourses();
      console.log('Course deleted successfully');
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const fetchCourses = () => {
    axios.get('http://localhost:8081/admin/courses')
      .then((response) => {
        setCourses(response.data);
        console.log('Courses fetched successfully');
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
      });
  };

  return (
    <div>
      <h2>Manage Courses</h2>
      <div>
        <h3>Create Course</h3>
        <input
          type="text"
          placeholder="Course Name"
          value={newCourseName}
          onChange={(e) => setNewCourseName(e.target.value)}
        />
        <button onClick={handleCreateCourse}>Create</button>
      </div>
      <ul>
        {courses.map((course) => (
          <li key={course.courseId}>
            {editingcourseId === course.courseId ? (
              <>
                <input
                  type="text"
                  value={updatedCourseName}
                  onChange={(e) => setUpdatedCourseName(e.target.value)}
                />
                <button onClick={() => handleEditCourse(course.courseId)}>Save</button>
              </>
            ) : (
              <>
                {course.CourseName}
                <button onClick={() => setEditingcourseId(course.courseId)}>Edit</button>
                <button onClick={() => handleDeleteCourse(course.courseId)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminCourses;
