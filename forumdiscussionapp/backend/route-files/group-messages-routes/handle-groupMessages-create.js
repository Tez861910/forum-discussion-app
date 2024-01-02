const { query } = require('../../db');

async function handleGroupMessagesCreate(req, res) {
  const { groupId, senderId, messageContent } = req.body;

  try {
    if (!groupId || !senderId || !messageContent) {
      console.log('GroupID, SenderID, and MessageContent are required');
      return res.status(400).json({
        error: 'GroupID, SenderID, and MessageContent are required',
      });
    }

    const sql = 'INSERT INTO GroupMessages (GroupID, SenderID, MessageContent) VALUES (?, ?, ?)';
    const [result] = await query(sql, [groupId, senderId, messageContent]);

    if (result.affectedRows === 1) {
      console.log('Group message sent successfully');
      res.json({ message: 'Group message sent successfully' });
    } else {
      console.error('Group message sending failed');
      res.status(500).json({ error: 'Group message sending failed' });
    }
  } catch (error) {
    console.error('Error sending group message:', error);
    res.status(500).json({ error: 'Group message sending failed', details: error.message });
  }
}

module.exports = {
  handleGroupMessagesCreate,
};
