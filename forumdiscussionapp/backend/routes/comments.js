const express = require('express');
const router = express.Router();
const { query } = require('../db');
const { isUserAuthorized } = require('../authvalid');


router.get('/comments/get', async (req, res) => {
  const { threadId } = req.params;

  try {
    const sql = 'SELECT * FROM comments  = ?';
    const [results] = await query(sql, [threadId]);

    console.log('Comments fetched successfully');
    res.json({ comments: results });
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Comment retrieval failed', details: error.message });
  }
});

// Create a new comment 
router.post('/comments/create', async (req, res) => {
  const { threadId } = req.params;
  const { content, userId, courseId } = req.body;

  try {
 

    if (!content) {
      console.log('Comment content is required');
      return res.status(400).json({ error: 'Comment content is required' });
    }

    const sql = 'INSERT INTO comments (Content, UserID, CourseID, ThreadID) VALUES (?, ?, ?, ?)';
    const [result] = await query(sql, [content, userId, courseId, threadId]);

    if (result.affectedRows === 1) {
      console.log('Comment created successfully');
      res.json({ message: 'Comment created successfully' });
    } else {
      console.error('Comment creation failed');
      res.status(500).json({ error: 'Comment creation failed' });
    }
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Comment creation failed', details: error.message });
  }
});

// Update a comment
router.put('/comments/update/:id', async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    if (!content) {
      console.log('Comment content is required');
      return res.status(400).json({ error: 'Comment content is required' });
    }

    const sql = 'UPDATE comments SET Content = ? WHERE CommentID = ?';
    const [result] = await query(sql, [content, id]);

    if (result.affectedRows === 1) {
      console.log('Comment updated successfully');
      res.json({ message: 'Comment updated successfully' });
    } else {
      console.error('Comment update failed');
      res.status(500).json({ error: 'Comment update failed' });
    }
  } catch (error) {
    console.error('Error updating comment:', error);
    res.status(500).json({ error: 'Comment update failed', details: error.message });
  }
});

// Delete a comment
router.delete('/comments/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const sql = 'DELETE FROM comments WHERE CommentID = ?';
    const [result] = await query(sql, [id]);

    if (result.affectedRows === 1) {
      console.log('Comment deleted successfully');
      res.json({ message: 'Comment deleted successfully' });
    } else {
      console.error('Comment deletion failed');
      res.status(500).json({ error: 'Comment deletion failed' });
    }
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ error: 'Comment deletion failed', details: error.message });
  }
});

module.exports = router;
