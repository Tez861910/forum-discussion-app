const { query } = require('../../db');

async function handleRealTimeGroupUpdateGet(req, res) {
  const { updateId } = req.params;

  try {
    const sql = 'SELECT * FROM RealTimeGroupUpdates WHERE RTGUpdateID = ?';
    const [result] = await query(sql, [updateId]);

    if (result.length > 0) {
      console.log('Real-time update for group retrieved successfully');
      res.json({ realTimeGroupUpdate: result[0] });
    } else {
      console.error('Real-time update for group not found');
      res.status(404).json({ error: 'Real-time update for group not found' });
    }
  } catch (error) {
    console.error('Error getting real-time update for group:', error);
    res.status(500).json({ error: 'Error getting real-time update for group', details: error.message });
  }
}

module.exports = {
  handleRealTimeGroupUpdateGet,
};
