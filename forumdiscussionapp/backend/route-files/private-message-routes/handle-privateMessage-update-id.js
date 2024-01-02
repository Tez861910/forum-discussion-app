const { query } = require('../../db');

async function handlePrivateMessageUpdateById(req, res) {
  const { messageId } = req.params;
  const { senderId, receiverId, messageContent } = req.body;

  try {
    const sql =
      'UPDATE PrivateMessages SET SenderID = ?, ReceiverID = ?, MessageContent = ? WHERE MessageID = ?';
    const [result] = await query(sql, [senderId, receiverId, messageContent, messageId]);

    if (result.affectedRows === 1) {
      console.log('Private message updated successfully');
      res.json({ message: 'Private message updated successfully' });
    } else {
      console.error('Private message update failed');
      res.status(500).json({ error: 'Private message update failed' });
    }
  } catch (error) {
    console.error('Error updating private message:', error);
    res.status(500).json({ error: 'Private message update failed', details: error.message });
  }
}

module.exports = {
  handlePrivateMessageUpdateById,
};
