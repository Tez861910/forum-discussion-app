const { query } = require('../../db');

async function handleManagerGet(req, res) {
  const { managerId } = req.params;

  try {
    const sql = 'SELECT * FROM GroupManager WHERE ManagerID = ?';
    const [result] = await query(sql, [managerId]);

    if (result.length > 0) {
      console.log('Group manager retrieved successfully');
      res.json({ groupManager: result[0] });
    } else {
      console.error('Group manager not found');
      res.status(404).json({ error: 'Group manager not found' });
    }
  } catch (error) {
    console.error('Error getting group manager:', error);
    res.status(500).json({ error: 'Error getting group manager', details: error.message });
  }
}

module.exports = {
  handleManagerGet,
};
