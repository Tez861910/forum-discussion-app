const { query } = require('../../../db');

async function handleNotificationCreate(req, res) {
  const { userId, notificationContent, actionType, actionLink } = req.body;

  try {
    if (!userId || !notificationContent || !actionType) {
      console.log('UserId, notificationContent, and actionType are required');
      return res
        .status(400)
        .json({ error: 'UserId, notificationContent, and actionType are required' });
    }

    const sql =
      'INSERT INTO Notifications (UserID, NotificationContent, ActionType, ActionLink) VALUES (?, ?, ?, ?)';
    const [result] = await query(sql, [userId, notificationContent, actionType, actionLink]);

    if (result.affectedRows === 1) {
      console.log('Notification created successfully');
      res.json({ message: 'Notification created successfully' });
    } else {
      console.error('Notification creation failed');
      res.status(500).json({ error: 'Notification creation failed' });
    }
  } catch (error) {
    console.error('Error creating notification:', error);
    res.status(500).json({ error: 'Notification creation failed', details: error.message });
  }
}

module.exports = {
  handleNotificationCreate,
};
