const { query } = require('../db');

async function handleCommentUpdateId(req, res) {
    {
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
    }       
 };

 module.exports = {
  handleCommentUpdateId,
};