const { query } = require('../../../db');

async function handlePrivateMessageCreate(req, res) {
  const { senderId, receiverId, messageContent } = req.body;

  try {
    if (!senderId || !receiverId || !messageContent) {
      console.log('SenderID, ReceiverID, and MessageContent are required');
      return res.status(400).json({
        error: 'SenderID, ReceiverID, and MessageContent are required',
      });
    }

    const sql =
      'INSERT INTO PrivateMessages (SenderID, ReceiverID, MessageContent) VALUES (?, ?, ?)';
    const [result] = await query(sql, [senderId, receiverId, messageContent]);

    if (result.affectedRows === 1) {
      console.log('Private message created successfully');
      res.json({ message: 'Private message created successfully' });
    } else {
      console.error('Private message creation failed');
      res.status(500).json({ error: 'Private message creation failed' });
    }
  } catch (error) {
    console.error('Error creating private message:', error);
    res.status(500).json({ error: 'Private message creation failed', details: error.message });
  }
}

module.exports = {
  handlePrivateMessageCreate,
};
