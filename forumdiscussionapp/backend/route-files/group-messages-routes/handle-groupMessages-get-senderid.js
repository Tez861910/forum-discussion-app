const { query } = require('../../db');

async function handleGroupMessagesGetBySenderId(req, res) {
  const { senderId } = req.params;

  try {
    const sql = 'SELECT * FROM GroupMessages WHERE SenderID = ?';
    const [result] = await query(sql, [senderId]);

    console.log('Group messages retrieved successfully');
    res.json(result);
  } catch (error) {
    console.error('Error getting group messages:', error);
    res.status(500).json({ error: 'Error getting group messages', details: error.message });
  }
}

module.exports = {
  handleGroupMessagesGetBySenderId,
};
