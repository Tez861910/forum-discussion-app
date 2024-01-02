const { query } = require('../../db');

async function handleGroupChatGetByName(req, res) {
  const { groupName } = req.params;

  try {
    const sql =
      'SELECT * FROM GroupChat WHERE GroupName = ?';
    const [result] = await query(sql, [groupName]);

    if (result.length > 0) {
      console.log('Group chat retrieved successfully');
      res.json(result[0]);
    } else {
      console.error('Group chat not found');
      res.status(404).json({ error: 'Group chat not found' });
    }
  } catch (error) {
    console.error('Error getting group chat:', error);
    res.status(500).json({ error: 'Error getting group chat', details: error.message });
  }
}

module.exports = {
  handleGroupChatGetByName,
};
