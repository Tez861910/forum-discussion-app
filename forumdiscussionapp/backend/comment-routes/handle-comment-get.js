const { query } = require('../db');

async function handleCommentGet(req, res) {
{
  const { threadId } = req.params;

  try {
    const sql = 'SELECT * FROM comments Where ThreadID = ?';
    const [results] = await query(sql, [threadId]);

    console.log('Comments fetched successfully');
    res.json({ comments: results });
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Comment retrieval failed', details: error.message });
  }
 }
};

module.exports = {
  handleCommentGet,
};