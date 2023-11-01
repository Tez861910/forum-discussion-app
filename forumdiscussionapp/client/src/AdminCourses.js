import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admincourse.css';

function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [newCourseName, setNewCourseName] = useState('');
  const [editingcourseId, setEditingcourseId] = useState(null);
  const [updatedCourseName, setUpdatedCourseName] = useState('');

  useEffect(() => {
    
    axios.get('http://localhost:8081/courses/courses/get')
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
      await axios.post('http://localhost:8081/courses/courses/create', { courseName: newCourseName });

      setNewCourseName('');
      console.log('Course created successfully');
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  const handleEditCourse = async (courseId) => {
    try {
      await axios.put(`http://localhost:8081/courses/courses/update/:id${courseId}`, { courseName: updatedCourseName });

      setEditingcourseId(null);
      setUpdatedCourseName('');
      console.log('Course updated successfully');
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      await axios.delete(`http://localhost:8081/courses/courses/delete/:id${courseId}`);
      console.log('Course deleted successfully');
    } catch (error) {
      console.error('Error deleting course:', error);
    }
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
