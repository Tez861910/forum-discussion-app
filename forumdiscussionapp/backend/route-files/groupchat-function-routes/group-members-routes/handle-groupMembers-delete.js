const { query } = require('../../../db');

async function handleGroupMembersDelete(req, res) {
  const { groupId, userId } = req.params;

  try {
    const sql = 'DELETE FROM GroupMembers WHERE GroupID = ? AND UserID = ?';
    const [result] = await query(sql, [groupId, userId]);

    if (result.affectedRows === 1) {
      console.log('Group member deleted successfully');
      res.json({ message: 'Group member deleted successfully' });
    } else {
      console.error('Group member deletion failed');
      res.status(500).json({ error: 'Group member deletion failed' });
    }
  } catch (error) {
    console.error('Error deleting group member:', error);
    res.status(500).json({ error: 'Error deleting group member', details: error.message });
  }
}

module.exports = {
  handleGroupMembersDelete,
};
