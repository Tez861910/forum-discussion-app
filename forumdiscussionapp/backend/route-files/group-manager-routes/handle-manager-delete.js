const { query } = require('../../db');

async function handleManagerDelete(req, res) {
  const { managerId } = req.params;

  try {
    const sql = 'DELETE FROM GroupManager WHERE ManagerID = ?';
    const [result] = await query(sql, [managerId]);

    if (result.affectedRows === 1) {
      console.log('Group manager deleted successfully');
      res.json({ message: 'Group manager deleted successfully' });
    } else {
      console.error('Group manager deletion failed');
      res.status(500).json({ error: 'Group manager deletion failed' });
    }
  } catch (error) {
    console.error('Error deleting group manager:', error);
    res.status(500).json({ error: 'Error deleting group manager', details: error.message });
  }
}

module.exports = {
  handleManagerDelete,
};
