import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CreateThread({ userRole, userId }) {
  const [threadData, setThreadData] = useState({
    title: '',
    content: '',
    courseId: '', // Course selection added
  });

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch the courses associated with the teacher
    if (userRole === 'teacher') {
      axios.get(`http://localhost:8081/users/${userId}/courses`)
        .then((response) => {
          setCourses(response.data);
        })
        .catch((error) => {
          console.error('Error fetching courses:', error);
        });
    }
  }, [userRole, userId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setThreadData({ ...threadData, [name]: value });
  };

  const handleCreateThread = async (event) => {
    event.preventDefault();

    if (userRole === 'admin') {
      // Admin can create a thread without course selection
      try {
        await axios.post('http://localhost:8081/threads', threadData);
        // Optionally, you can navigate to the list of threads after creating one.
        // Example: navigate('/threads');
      } catch (error) {
        console.error('Error creating thread:', error);
      }
    } else if (userRole === 'teacher') {
      // Check if the teacher has selected a course
      if (!threadData.courseId) {
        console.error('Please select a course.');
        return;
      }

      try {
        await axios.post('http://localhost:8081/threads', threadData);
        // Optionally, you can navigate to the list of threads after creating one.
        // Example: navigate('/threads');
      } catch (error) {
        console.error('Error creating thread:', error);
      }
    }
  };

  return (
    <div>
      <h2>Create a New Thread</h2>
      <form onSubmit={handleCreateThread}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={threadData.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            name="content"
            value={threadData.content}
            onChange={handleInputChange}
          />
        </div>
        {userRole === 'teacher' && (
          <div>
            <label htmlFor="courseId">Select Course</label>
            <select
              name="courseId"
              value={threadData.courseId}
              onChange={handleInputChange}
            >
              <option value="">Select a Course</option>
              {courses.map((course) => (
                <option key={course.courseId} value={course.courseId}>
                  {course.CourseName}
                </option>
              ))}
            </select>
          </div>
        )}
        <button type="submit">Create Thread</button>
      </form>
    </div>
  );
}

export default CreateThread;
