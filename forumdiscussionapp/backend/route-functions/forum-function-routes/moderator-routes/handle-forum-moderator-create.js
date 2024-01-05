const { query } = require('../../../db');

async function handleForumModeratorCreate(req, res) {
  const { userId, forumId, promotedAt } = req.body;

  try {
    if (!userId || !forumId || !promotedAt) {
      console.log('UserID, ForumID, and PromotedAt are required');
      return res.status(400).json({ error: 'UserID, ForumID, and PromotedAt are required' });
    }

    const sql = 'INSERT INTO ForumsModerators (UserID, ForumID, PromotedAt) VALUES (?, ?, ?)';
    const [result] = await query(sql, [userId, forumId, promotedAt]);

    if (result.affectedRows === 1) {
      console.log('Forum moderator created successfully');
      res.json({ message: 'Forum moderator created successfully' });
    } else {
      console.error('Forum moderator creation failed');
      res.status(500).json({ error: 'Forum moderator creation failed' });
    }
  } catch (error) {
    console.error('Error creating forum moderator:', error);
    res.status(500).json({ error: 'Forum moderator creation failed', details: error.message });
  }
}

module.exports = {
  handleForumModeratorCreate,
};
