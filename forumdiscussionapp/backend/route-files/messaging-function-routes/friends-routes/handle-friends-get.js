const { query } = require('../../../db');

async function handleFriendsGet(req, res) {
  const { userId } = req.params;

  try {
    const sql = 'SELECT * FROM Friends WHERE UserID1 = ? OR UserID2 = ?';
    const [result] = await query(sql, [userId, userId]);

    console.log('User friends retrieved successfully');
    res.json({ friends: result });
  } catch (error) {
    console.error('Error getting user friends:', error);
    res.status(500).json({ error: 'Error getting user friends', details: error.message });
  }
}

module.exports = {
  handleFriendsGet,
};
