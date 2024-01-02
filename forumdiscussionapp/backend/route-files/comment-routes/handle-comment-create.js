const { query } = require('../../db');

async function handleCommentCreate(req, res) {
  {
  const { threadId } = req.params;
  const { CommentContent: content, userId } = req.body;
  
    try {
   
  
      if (!content) {
        console.log('Comment content is required');
        return res.status(400).json({ error: 'Comment content is required' });
      }
  
      const sql = 'INSERT INTO comments (CommentContent, UserID, ThreadID) VALUES (?, ?, ?)';
      const [result] = await query(sql, [content, userId,  threadId]);
  
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
  }
};

module.exports = {
  handleCommentCreate,
};