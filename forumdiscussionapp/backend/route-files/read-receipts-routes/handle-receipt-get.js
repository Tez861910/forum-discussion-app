const { query } = require('../../db');

async function handleReceiptGet(req, res) {
  const { receiptId } = req.params;

  try {
    const sql = 'SELECT * FROM ReadReceipts WHERE ReceiptID = ?';
    const [result] = await query(sql, [receiptId]);

    if (result.length > 0) {
      console.log('Read receipt retrieved successfully');
      res.json({ readReceipt: result[0] });
    } else {
      console.error('Read receipt not found');
      res.status(404).json({ error: 'Read receipt not found' });
    }
  } catch (error) {
    console.error('Error getting read receipt:', error);
    res.status(500).json({ error: 'Error getting read receipt', details: error.message });
  }
}

module.exports = {
  handleReceiptGet,
};
