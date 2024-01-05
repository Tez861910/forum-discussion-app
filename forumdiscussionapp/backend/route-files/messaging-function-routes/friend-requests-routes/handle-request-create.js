const { query } = require('../../../db');

async function handleRequestCreate(req, res) {
  const { senderId, receiverId } = req.body;

  try {
    const sql = 'INSERT INTO FriendRequests (SenderID, ReceiverID) VALUES (?, ?)';
    const [result] = await query(sql, [senderId, receiverId]);

    if (result.affectedRows === 1) {
      console.log('Friend request created successfully');
      res.json({ message: 'Friend request created successfully' });
    } else {
      console.error('Friend request creation failed');
      res.status(500).json({ error: 'Friend request creation failed' });
    }
  } catch (error) {
    console.error('Error creating friend request:', error);
    res.status(500).json({ error: 'Friend request creation failed', details: error.message });
  }
}

module.exports = {
  handleRequestCreate,
};
