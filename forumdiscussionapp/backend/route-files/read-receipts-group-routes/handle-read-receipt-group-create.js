const { query } = require('../../db');

async function handleReadReceiptGroupCreate(req, res) {
  const { groupMessageId, userId } = req.body;

  try {
    const sql = 'INSERT INTO ReadReceiptsGroup (GroupMessageID, UserID) VALUES (?, ?)';
    const [result] = await query(sql, [groupMessageId, userId]);

    if (result.affectedRows === 1) {
      console.log('Read receipt for group message created successfully');
      res.json({ message: 'Read receipt for group message created successfully' });
    } else {
      console.error('Read receipt creation for group message failed');
      res.status(500).json({ error: 'Read receipt creation for group message failed' });
    }
  } catch (error) {
    console.error('Error creating read receipt for group message:', error);
    res.status(500).json({ error: 'Read receipt creation for group message failed', details: error.message });
  }
}

module.exports = {
  handleReadReceiptGroupCreate,
};
