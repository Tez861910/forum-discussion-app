const { query } = require('../../db');

// Create a new response for a comment
async function createResponse(req, res) {
    const { commentId } = req.params;
    const { ResponseContent, userId } = req.body;
  
    try {
      await query('INSERT INTO responses (ResponseContent, UserID, CommentID) VALUES (?, ?, ?)', [ResponseContent, userId, commentId]);
  
      res.json({ message: 'Response added successfully' });
    } catch (error) {
      console.error('Error adding response:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  module.exports={
    createResponse,
}