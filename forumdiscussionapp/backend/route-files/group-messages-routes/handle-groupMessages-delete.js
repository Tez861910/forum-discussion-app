const { query } = require('../../db');

async function handleGroupMessagesDelete(req, res) {
  const { messageId } = req.params;

  try {
    const sql = 'DELETE FROM GroupMessages WHERE MessageID = ?';
    const [result] = await query(sql, [messageId]);

    if (result.affectedRows === 1) {
      console.log('Group message deleted successfully');
      res.json({ message: 'Group message deleted successfully' });
    } else {
      console.error('Group message deletion failed');
      res.status(500).json({ error: 'Group message deletion failed' });
    }
  } catch (error) {
    console.error('Error deleting group message:', error);
    res.status(500).json({ error: 'Error deleting group message', details: error.message });
  }
}

module.exports = {
  handleGroupMessagesDelete,
};
