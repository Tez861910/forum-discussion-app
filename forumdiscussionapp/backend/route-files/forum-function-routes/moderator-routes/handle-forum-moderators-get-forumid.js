const { query } = require('../../../db');

async function handleForumModeratorGetForumId(req, res) {
  const { forumId } = req.params;

  try {
    const sql = 'SELECT * FROM ForumsModerators WHERE ForumID = ?';
    const [result] = await query(sql, [forumId]);

    console.log('Forum moderators retrieved successfully for forumId:', forumId);
    res.json(result);
  } catch (error) {
    console.error('Error getting forum moderators for forumId:', forumId, error);
    res.status(500).json({ error: 'Error getting forum moderators', details: error.message });
  }
}

module.exports = {
  handleForumModeratorGetForumId,
};
