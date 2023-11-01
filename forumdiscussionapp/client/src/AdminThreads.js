import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './adminthread.css';

function AdminThreads() {
  const [threads, setThreads] = useState([]);
  const [newThread, setNewThread] = useState({
    title: '',
    content: '',
  });
  

  useEffect(() => {
    fetchThreads();
  }, []);

  const fetchThreads = () => {
    axios.get('http://localhost:8081/threads/threads/get')
      .then((response) => {
        setThreads(response.data);
        console.log('Threads fetched successfully');
      })
      .catch((error) => {
        console.error('Error fetching threads:', error);
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
    axios.put(`http://localhost:8081/threads/threads/update/:id${threadId}`, updatedData)
      .then(() => {
       
        fetchThreads();
        console.log('Thread updated successfully');
      })
      .catch((error) => {
        console.error('Error updating thread:', error);
      });
  };

  const deleteThread = (threadId) => {
    axios.delete(`http://localhost:8081/threads/threads/update/:id${threadId}`)
      .then(() => {
       
        fetchThreads();
        console.log('Thread deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting thread:', error);
      });
  };

  return (
    <div>
      <h2>Manage Threads</h2>
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
      <h3>Create New Thread</h3>
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
    </div>
  );
}

export default AdminThreads;
