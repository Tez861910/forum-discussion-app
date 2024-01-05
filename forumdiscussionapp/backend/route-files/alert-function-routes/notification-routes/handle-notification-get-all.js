const { query } = require('../../../db');

async function handleNotificationGetAll(req, res) {
  try {
    const sql = 'SELECT * FROM Notifications';
    const [result] = await query(sql);

    console.log('Notifications retrieved successfully');
    res.json({ notifications: result });
  } catch (error) {
    console.error('Error getting notifications:', error);
    res.status(500).json({ error: 'Error getting notifications', details: error.message });
  }
}

module.exports = {
  handleNotificationGetAll,
};
