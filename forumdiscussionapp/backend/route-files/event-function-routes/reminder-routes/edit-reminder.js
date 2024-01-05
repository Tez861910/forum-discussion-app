const { query } = require('../../../db');

async function editReminder(req, res) {
  try {
    const { eventId, reminderId } = req.params;
    const { UpdatedReminderTime } = req.body;
    const UserID = req.user.userId;

    // Update the ReminderTime in the Reminders table
    await query(
      'UPDATE Reminders SET ReminderTime = ? WHERE EventID = ? AND ReminderID = ?',
      [UpdatedReminderTime, eventId, reminderId]
    );

    // Update the CommonAttributes table with the updated information
    await query(
      'UPDATE CommonAttributes SET UpdatedByUserID = ? WHERE AttributeID = (SELECT CommonAttributeID FROM Reminders WHERE EventID = ? AND ReminderID = ?)',
      [UserID, eventId, reminderId]
    );

    res.json({ success: true, message: 'Reminder updated successfully' });
  } catch (error) {
    console.error('Error updating reminder:', error);
    res.status(500).json({ success: false, error: 'Error updating reminder' });
  }
}

module.exports = {
  editReminder,
};
