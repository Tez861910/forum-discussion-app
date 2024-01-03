const { query } = require('../../db');

async function handleUserActivityLogCreate(req, res) {
  const { userId, activityType, activityDetails, ipAddress } = req.body;

  try {
    if (!userId || !activityType) {
      console.log('UserId and ActivityType are required');
      return res.status(400).json({ error: 'UserId and ActivityType are required' });
    }

    const sql =
      'INSERT INTO UserActivityLog (UserID, ActivityType, ActivityDetails, IPAddress) VALUES (?, ?, ?, ?)';
    const [result] = await query(sql, [userId, activityType, activityDetails, ipAddress]);

    if (result.affectedRows === 1) {
      console.log('User activity log created successfully');
      res.json({ message: 'User activity log created successfully' });
    } else {
      console.error('User activity log creation failed');
      res.status(500).json({ error: 'User activity log creation failed' });
    }
  } catch (error) {
    console.error('Error creating user activity log:', error);
    res.status(500).json({ error: 'User activity log creation failed', details: error.message });
  }
}

module.exports = {
  handleUserActivityLogCreate,
};
