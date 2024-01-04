const { query } = require('../../db');

async function handleUpdateGet(req, res) {
  const { updateId } = req.params;

  try {
    const sql = 'SELECT * FROM RealTimeUpdates WHERE RTUpdateID = ?';
    const [result] = await query(sql, [updateId]);

    if (result.length > 0) {
      console.log('Real-time update retrieved successfully');
      res.json({ realTimeUpdate: result[0] });
    } else {
      console.error('Real-time update not found');
      res.status(404).json({ error: 'Real-time update not found' });
    }
  } catch (error) {
    console.error('Error getting real-time update:', error);
    res.status(500).json({ error: 'Error getting real-time update', details: error.message });
  }
}

module.exports = {
  handleUpdateGet,
};
