const { query } = require('../../db');

async function softDeleteGuestSpeaker(req, res) {
  try {
    const { eventId, guestSpeakerId } = req.params;
    const UserID = req.user.userId;

    // Check if the guest speaker is already deleted
    const isGuestSpeakerDeleted = await query(
      'SELECT IsDeleted FROM CommonAttributes WHERE AttributeID = (SELECT CommonAttributeID FROM GuestSpeakers WHERE EventID = ? AND SpeakerID = ?)',
      [eventId, guestSpeakerId]
    );

    if (isGuestSpeakerDeleted[0].IsDeleted) {
      // If the guest speaker is already marked as deleted, return success (no need to delete again)
      return res.json({ success: true, message: 'Guest speaker already deleted' });
    }

    // Update the IsDeleted field in the CommonAttributes table
    await query(
      'UPDATE CommonAttributes SET IsDeleted = true, UpdatedByUserID = ? WHERE AttributeID = (SELECT CommonAttributeID FROM GuestSpeakers WHERE EventID = ? AND SpeakerID = ?)',
      [UserID, eventId, guestSpeakerId]
    );

    res.json({ success: true, message: 'Guest speaker soft deleted successfully' });
  } catch (error) {
    console.error('Error soft deleting guest speaker:', error);
    res.status(500).json({ success: false, error: 'Error soft deleting guest speaker' });
  }
}

module.exports = {
  softDeleteGuestSpeaker,
};
