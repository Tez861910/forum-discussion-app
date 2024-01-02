const { query } = require('../../db');

async function handleForumModeratorGetUserId(req, res) {
  const { userId } = req.params;

  try {
    const sql = 'SELECT * FROM ForumsModerators WHERE UserID = ?';
    const [result] = await query(sql, [userId]);

    console.log('Forum moderators retrieved successfully for userId:', userId);
    res.json(result);
  } catch (error) {
    console.error('Error getting forum moderators for userId:', userId, error);
    res.status(500).json({ error: 'Error getting forum moderators', details: error.message });
  }
}

module.exports = {
  handleForumModeratorGetUserId,
};
