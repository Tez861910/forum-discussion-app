const express = require('express');
const router = express.Router();
const {query} = require('../db');
router.use(express.json());


const threadsData = [
  { threadId: 1, title: 'Thread 1', content: 'Content for Thread 1' },
  { threadId: 2, title: 'Thread 2', content: 'Content for Thread 2' },
];

// Endpoint to get threads for a specific course
router.get('/threads/course', (req, res) => {
  const courseId = req.query.courseId; // Get the courseId from the query parameters
  const filteredThreads = threadsData.filter((thread) => thread.courseId === courseId);

  res.json(filteredThreads);
});


// Create a new thread
router.post('/threads/create', async (req, res) => {
  const { title, content, courseId } = req.body;

  try {
    if (!title || !content || !courseId) {
      console.log('Title, content, and courseId are required');
      return res.status(400).json({ error: 'Title, content, and courseId are required' });
    }
    const sql = 'INSERT INTO threads (Title, Content, CourseID) VALUES (?, ?, ?)';
    const [result] = await query(sql, [title, content, courseId]);

    if (result.affectedRows === 1) {
      console.log('Thread created successfully');
      res.json({ message: 'Thread created successfully' });
    } else {
      console.error('Thread creation failed');
      res.status(500).json({ error: 'Thread creation failed' });
    }
  } catch (error) {
    console.error('Error creating thread:', error);
    res.status(500).json({ error: 'Thread creation failed', details: error.message });
  }
});

// Get all threads
router.get('/threads/get', async (req, res) => {
  try {
    const sql = 'SELECT * FROM threads';
    const [results] = await query(sql);

    console.log('Threads fetched successfully');
    res.json({ threads: results });
  } catch (error) {
    console.error('Error fetching threads:', error);
    res.status(500).json({ error: 'Thread retrieval failed', details: error.message });
  }
});

// Update a thread
router.put('/threads/update/:id',  async (req, res) => {
  const { id } = req.params;
  const { title, content, courseId } = req.body;

  try {
    if (!title || !content || !courseId) {
      console.log('Title, content, and courseId are required');
      return res.status(400).json({ error: 'Title, content, and courseId are required' });
    }

  

    const sql = 'UPDATE threads SET Title = ?, Content = ?, CourseID = ? WHERE ThreadID = ?';
    const [result] = await query(sql, [title, content, courseId, id]);

    if (result.affectedRows === 1) {
      console.log('Thread updated successfully');
      res.json({ message: 'Thread updated successfully' });
    } else {
      console.error('Thread update failed');
      res.status(500).json({ error: 'Thread update failed' });
    }
  } catch (error) {
    console.error('Error updating thread:', error);
    res.status(500).json({ error: 'Thread update failed', details: error.message });
  }
});

// Delete a thread
router.delete('/threads/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
   

    const sql = 'DELETE FROM threads WHERE ThreadID = ?';
    const [result] = await query(sql, [id]);

    if (result.affectedRows === 1) {
      console.log('Thread deleted successfully');
      res.json({ message: 'Thread deleted successfully' });
    } else {
      console.error('Thread deletion failed');
      res.status(500).json({ error: 'Thread deletion failed' });
    }
  } catch (error) {
    console.error('Error deleting thread:', error);
    res.status(500).json({ error: 'Thread deletion failed', details: error.message });
  }
});

module.exports = router;
