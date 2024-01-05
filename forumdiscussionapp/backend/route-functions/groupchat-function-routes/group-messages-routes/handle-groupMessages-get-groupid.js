const { query } = require('../../../db');

async function handleGroupMessagesGetByGroupId(req, res) {
  const { groupId } = req.params;

  try {
    const sql = 'SELECT * FROM GroupMessages WHERE GroupID = ?';
    const [result] = await query(sql, [groupId]);

    console.log('Group messages retrieved successfully');
    res.json(result);
  } catch (error) {
    console.error('Error getting group messages:', error);
    res.status(500).json({ error: 'Error getting group messages', details: error.message });
  }
}

module.exports = {
  handleGroupMessagesGetByGroupId,
};
