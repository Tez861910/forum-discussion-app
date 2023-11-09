import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './adminthread.css';

function AdminThreads() {
  const [threads, setThreads] = useState([]);
  const [newThread, setNewThread] = useState({
    title: '',
    content: '',
    courseId: 1, 
  });

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchThreads();
    fetchCourses(); 
  }, []);

  const fetchThreads = () => {
    axios.get('http://localhost:8081/threads/threads/get/all')
      .then((response) => {
        setThreads(response.data);
        console.log('Threads fetched successfully');
      })
      .catch((error) => {
        console.error('Error fetching threads:', error);
      });
  };

  const fetchCourses = () => {
    axios.get('http://localhost:8081/courses/courses/get') 
      .then((response) => {
        setCourses(response.data);
        console.log('Courses fetched successfully');
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
      });
  };

  const createThread = () => {
    axios.post('http://localhost:8081/threads/threads/create', newThread)
      .then(() => {
        fetchThreads();
        console.log('Thread created successfully');
      })
      .catch((error) => {
        console.error('Error creating thread:', error);
      });
  };

  const updateThread = (threadId, updatedData) => {
    axios.put(`http://localhost:8081/threads/threads/update/${threadId}`, updatedData)
      .then(() => {
        fetchThreads();
        console.log('Thread updated successfully');
      })
      .catch((error) => {
        console.error('Error updating thread:', error);
      });
  };

  const deleteThread = (threadId) => {
    axios.delete(`http://localhost:8081/threads/threads/update/${threadId}`)
      .then(() => {
        fetchThreads();
        console.log('Thread deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting thread:', error);
      });
  };

  return (
    <div className="admin-thread-container">
      <h2>Manage Threads</h2>
      <h3>Create New Thread</h3>
      
<select
  value={newThread.courseId || ''}
  onChange={(e) => setNewThread({ ...newThread, courseId: parseInt(e.target.value, 10) })}
>
  {Array.isArray(courses) && courses.length > 0 && courses.map((course) => (
    <option key={course.CourseID} value={course.CourseID}>
      {course.CourseName}
    </option>
  ))}
</select>
      <input
        type="text"
        placeholder="Title"
        value={newThread.title}
        onChange={(e) => setNewThread({ ...newThread, title: e.target.value })}
      />
      <textarea
        placeholder="Content"
        value={newThread.content}
        onChange={(e) => setNewThread({ ...newThread, content: e.target.value })}
      />
      <button onClick={createThread}>Create</button>

      <ul>
  {threads.map((thread) => (
    <li key={thread.id}>
      <h3>{thread.title}</h3>
      <p>{thread.content}</p>
      <button onClick={() => updateThread(thread.id, { title: 'Updated Title' })}>Update</button>
      <button onClick={() => deleteThread(thread.id)}>Delete</button>
    </li>
  ))}
</ul>
    </div>
  );
}

export default AdminThreads;
