const express = require('express');
const router = express.Router();
const { query } = require('../db');

// Get all responses for a comment
router.get('/responses/get/:commentId', async (req, res) => {
  const { commentId } = req.params;

  try {
    const result = await query('SELECT * FROM responses WHERE CommentID = ?', [commentId]);
    let responses = result[0];

    // Ensure responses is always an array
    if (!Array.isArray(responses)) {
      responses = [responses];
    }

    res.json({ responses });
  } catch (error) {
    console.error('Error fetching responses:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Create a new response for a comment
router.post('/responses/create/:commentId', async (req, res) => {
  const { commentId } = req.params;
  const { ResponseContent, userId } = req.body;

  try {
   
    await query('INSERT INTO responses (ResponseContent, UserID, CommentID) VALUES (?, ?, ?)', [ResponseContent, userId, commentId]);

    res.json({ message: 'Response added successfully' });
  } catch (error) {
    console.error('Error adding response:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a response
router.put('/responses/update/:responseId', async (req, res) => {
  const { responseId } = req.params;
  const { content } = req.body;

  try {
    await query('UPDATE responses SET ResponseContent = ? WHERE ResponseID = ?', [content, responseId]);

    res.json({ message: 'Response updated successfully' });
  } catch (error) {
    console.error('Error updating response:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a response
router.delete('/responses/delete/:responseId', async (req, res) => {
  const { responseId } = req.params;

  try {
    await query('DELETE FROM responses WHERE ResponseID = ?', [responseId]);

    res.json({ message: 'Response deleted successfully' });
  } catch (error) {
    console.error('Error deleting response:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
