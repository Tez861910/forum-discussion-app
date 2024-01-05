const { query } = require('../../../db');

async function handleUserActivityLogDelete(req, res) {
  const { logId } = req.params;

  try {
    const sql = 'DELETE FROM UserActivityLog WHERE LogID = ?';
    const [result] = await query(sql, [logId]);

    if (result.affectedRows === 1) {
      console.log('User activity log deleted successfully');
      res.json({ message: 'User activity log deleted successfully' });
    } else {
      console.error('User activity log deletion failed');
      res.status(500).json({ error: 'User activity log deletion failed' });
    }
  } catch (error) {
    console.error('Error deleting user activity log:', error);
    res.status(500).json({ error: 'User activity log deletion failed', details: error.message });
  }
}

module.exports = {
  handleUserActivityLogDelete,
};
