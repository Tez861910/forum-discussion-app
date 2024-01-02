const { query } = require('../../db');

async function handleGroupChatDeleteById(req, res) {
  const { groupId } = req.params;

  try {
    const sql = 'DELETE FROM GroupChat WHERE GroupID = ?';
    const [result] = await query(sql, [groupId]);

    if (result.affectedRows === 1) {
      console.log('Group chat deleted successfully');
      res.json({ message: 'Group chat deleted successfully' });
    } else {
      console.error('Group chat deletion failed');
      res.status(500).json({ error: 'Group chat deletion failed' });
    }
  } catch (error) {
    console.error('Error deleting group chat:', error);
    res.status(500).json({ error: 'Error deleting group chat', details: error.message });
  }
}

module.exports = {
  handleGroupChatDeleteById,
};
