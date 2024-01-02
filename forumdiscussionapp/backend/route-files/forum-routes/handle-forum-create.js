const { query } = require('../../db');

async function handleForumCreate(req, res) {
  const { forumName, forumDescription, createdByUserId } = req.body;
  try {
    if (!forumName || !forumDescription || !createdByUserId) {
      console.log('ForumName, ForumDescription, and CreatedByUserId are required');
      return res.status(400).json({ error: 'ForumName, ForumDescription, and CreatedByUserId are required' });
    }

    const sql = 'INSERT INTO Forums (ForumName, ForumDescription, CreatedByUserID) VALUES (?, ?, ?)';
    const [result] = await query(sql, [forumName, forumDescription, createdByUserId]);

    if (result.affectedRows === 1) {
      console.log('Forum created successfully');
      res.json({ message: 'Forum created successfully' });
    } else {
      console.error('Forum creation failed');
      res.status(500).json({ error: 'Forum creation failed' });
    }
  } catch (error) {
    console.error('Error creating forum:', error);
    res.status(500).json({ error: 'Forum creation failed', details: error.message });
  }
}

module.exports = {
  handleForumCreate,
};
