const { query } = require('../../../db');

async function handleGroupMembersGetByUserId(req, res) {
  const { userId } = req.params;

  try {
    const sql = 'SELECT * FROM GroupMembers WHERE UserID = ?';
    const [result] = await query(sql, [userId]);

    console.log('Groups retrieved successfully');
    res.json(result);
  } catch (error) {
    console.error('Error getting groups:', error);
    res.status(500).json({ error: 'Error getting groups', details: error.message });
  }
}

module.exports = {
  handleGroupMembersGetByUserId,
};
