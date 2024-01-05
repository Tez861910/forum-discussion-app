const { query } = require('../../../db');

async function softDeleteRecurringEvent(req, res) {
  try {
    const { eventId, recurringEventId } = req.params;
    const UserID = req.user.userId;

    // Check if the recurring event is already deleted
    const isRecurringEventDeleted = await query(
      'SELECT IsDeleted FROM CommonAttributes WHERE AttributeID = (SELECT CommonAttributeID FROM RecurringEvents WHERE EventID = ? AND RecurringEventID = ?)',
      [eventId, recurringEventId]
    );

    if (isRecurringEventDeleted[0].IsDeleted) {
      // If the recurring event is already marked as deleted, return success (no need to delete again)
      return res.json({ success: true, message: 'Recurring event already deleted' });
    }

    // Update the IsDeleted field in the CommonAttributes table
    await query(
      'UPDATE CommonAttributes SET IsDeleted = true, UpdatedByUserID = ? WHERE AttributeID = (SELECT CommonAttributeID FROM RecurringEvents WHERE EventID = ? AND RecurringEventID = ?)',
      [UserID, eventId, recurringEventId]
    );

    res.json({ success: true, message: 'Recurring event soft deleted successfully' });
  } catch (error) {
    console.error('Error soft deleting recurring event:', error);
    res.status(500).json({ success: false, error: 'Error soft deleting recurring event' });
  }
}

module.exports = {
  softDeleteRecurringEvent,
};
