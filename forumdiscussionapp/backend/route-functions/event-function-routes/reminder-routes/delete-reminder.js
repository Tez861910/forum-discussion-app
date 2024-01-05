const { query } = require('../../../db');

async function softDeleteReminder(req, res) {
  try {
    const { eventId, reminderId } = req.params;
    const UserID = req.user.userId;

    // Check if the reminder is already deleted
    const isReminderDeleted = await query(
      'SELECT IsDeleted FROM CommonAttributes WHERE AttributeID = (SELECT CommonAttributeID FROM Reminders WHERE EventID = ? AND ReminderID = ?)',
      [eventId, reminderId]
    );

    if (isReminderDeleted[0].IsDeleted) {
      // If the reminder is already marked as deleted, return success (no need to delete again)
      return res.json({ success: true, message: 'Reminder already deleted' });
    }

    // Update the IsDeleted field in the CommonAttributes table
    await query(
      'UPDATE CommonAttributes SET IsDeleted = true, UpdatedByUserID = ? WHERE AttributeID = (SELECT CommonAttributeID FROM Reminders WHERE EventID = ? AND ReminderID = ?)',
      [UserID, eventId, reminderId]
    );

    res.json({ success: true, message: 'Reminder soft deleted successfully' });
  } catch (error) {
    console.error('Error soft deleting reminder:', error);
    res.status(500).json({ success: false, error: 'Error soft deleting reminder' });
  }
}

module.exports = {
  softDeleteReminder,
};
