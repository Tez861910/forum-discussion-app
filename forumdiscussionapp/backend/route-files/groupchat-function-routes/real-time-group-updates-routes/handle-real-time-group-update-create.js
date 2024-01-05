const { query } = require('../../../db');

async function handleRealTimeGroupUpdateCreate(req, res) {
  const { groupId, userId, updateType, data } = req.body;

  try {
    const sql = 'INSERT INTO RealTimeGroupUpdates (GroupID, UserID, UpdateType, Data) VALUES (?, ?, ?, ?)';
    const [result] = await query(sql, [groupId, userId, updateType, data]);

    if (result.affectedRows === 1) {
      console.log('Real-time update for group created successfully');
      res.json({ message: 'Real-time update for group created successfully' });
    } else {
      console.error('Real-time update creation for group failed');
      res.status(500).json({ error: 'Real-time update creation for group failed' });
    }
  } catch (error) {
    console.error('Error creating real-time update for group:', error);
    res.status(500).json({ error: 'Real-time update creation for group failed', details: error.message });
  }
}

module.exports = {
  handleRealTimeGroupUpdateCreate,
};
