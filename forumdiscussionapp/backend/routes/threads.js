const express = require('express');
const router = express.Router();
const db = require('../db'); // Import the database connection
const { createToken, hashPassword, verifyPassword } = require('../authvalid'); // Import password functions
const { verifyJwt } = require('../authvalid'); // Import the verifyJwt function
const jwt = require('jsonwebtoken');

// Create a new thread
router.post('/', verifyJwt, async (req, res) => {
  const { title, content, courseId } = req.body;

  try {
    if (req.userRole !== 'teacher') {
      return res.status(403).json({ error: 'Only teachers can create threads.' });
    }

    const sql = 'INSERT INTO threads (ThreadTitle, ThreadContent, UserID, CourseID) VALUES (?, ?, ?, ?)';
    const values = [title, content, req.userId, courseId];

    await db.query(sql, values);

    res.json({ message: 'Thread created successfully' });
  } catch (error) {
    console.error('Create thread error:', error);
    res.status(500).json({ error: 'Thread creation failed' });
  }
});

// Comment Section - Fetch comments for a thread
router.get('/:threadId/comments', async (req, res) => {
  const threadId = req.params.threadId;
  const sql = 'SELECT * FROM comments WHERE ThreadID = ?';

  try {
    const [results] = await db.query(sql, [threadId]);
    res.json(results);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Error fetching comments' });
  }
});

// Comment Section - Add a comment to a thread
router.post('/:threadId/comments', verifyJwt, async (req, res) => {
  const { content } = req.body;
  const threadId = req.params.threadId;

  try {
    const sql = 'INSERT INTO comments (CommentContent, UserID, ThreadID) VALUES (?, ?, ?)';
    const values = [content, req.userId, threadId];

    await db.query(sql, values);

    res.json({ message: 'Comment added successfully' });
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({ error: 'Comment creation failed' });
  }
});

module.exports = router;
