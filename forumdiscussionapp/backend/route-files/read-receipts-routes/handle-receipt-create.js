const { query } = require('../../db');

async function handleReceiptCreate(req, res) {
  const { messageId, userId } = req.body;

  try {
    const sql = 'INSERT INTO ReadReceipts (MessageID, UserID) VALUES (?, ?)';
    const [result] = await query(sql, [messageId, userId]);

    if (result.affectedRows === 1) {
      console.log('Read receipt created successfully');
      res.json({ message: 'Read receipt created successfully' });
    } else {
      console.error('Read receipt creation failed');
      res.status(500).json({ error: 'Read receipt creation failed' });
    }
  } catch (error) {
    console.error('Error creating read receipt:', error);
    res.status(500).json({ error: 'Read receipt creation failed', details: error.message });
  }
}

module.exports = {
  handleReceiptCreate,
};
