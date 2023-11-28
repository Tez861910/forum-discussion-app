const { query } = require('../db'); 

async function handleCommentGetThreadId(req, res) {
  const { threadId } = req.params;
  const sql = 'SELECT * FROM Comments WHERE ThreadID = ?';
  
  try {
    const results = await query(sql, [threadId]);
    res.status(200).json({ comments: results });
  } catch (error) {
    console.error('Failed to retrieve comments:', error);
    res.status(500).json({ error: 'Failed to retrieve comments' });
  }
}

module.exports = {
  handleCommentGetThreadId,
};
