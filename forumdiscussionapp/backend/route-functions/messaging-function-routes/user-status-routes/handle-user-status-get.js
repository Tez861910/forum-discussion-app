const { query } = require('../../../db');

async function handleUserStatusGet(req, res) {
  const { userId } = req.params;

  try {
    const sql = 'SELECT * FROM UserStatus WHERE UserID = ?';
    const [result] = await query(sql, [userId]);

    if (result.length > 0) {
      console.log('User status retrieved successfully');
      res.json({ userStatus: result[0] });
    } else {
      console.error('User status not found');
      res.status(404).json({ error: 'User status not found' });
    }
  } catch (error) {
    console.error('Error getting user status:', error);
    res.status(500).json({ error: 'Error getting user status', details: error.message });
  }
}

module.exports = {
  handleUserStatusGet,
};
