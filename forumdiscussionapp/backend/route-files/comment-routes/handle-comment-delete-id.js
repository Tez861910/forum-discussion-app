const { query } = require('../../db');

async function handleCommentDeleteId(req, res) {
{
    const { commentId } = req.params;
  
    try {
      const sql = 'DELETE FROM comments WHERE CommentID = ?';
      const [result] = await query(sql, [commentId]);
  
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
  }
};

module.exports = {
  handleCommentDeleteId,
};