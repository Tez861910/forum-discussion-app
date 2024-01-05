const { query } = require('../../../db');

async function handleForumModeratorGet(req, res) {
  try {
    const sql = 'SELECT * FROM ForumsModerators';
    const [result] = await query(sql);

    console.log('Forum moderators retrieved successfully');
    res.json(result);
  } catch (error) {
    console.error('Error getting forum moderators:', error);
    res.status(500).json({ error: 'Error getting forum moderators', details: error.message });
  }
}

module.exports = {
  handleForumModeratorGet,
};
