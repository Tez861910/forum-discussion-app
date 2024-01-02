const { query } = require('../../db');

async function editGuestSpeaker(req, res) {
  try {
    const { eventId, guestSpeakerId } = req.params;
    const { UpdatedSpeakerName, UpdatedContributionDescription } = req.body;
    const UserID = req.user.userId;

    // Update the SpeakerName and ContributionDescription in the GuestSpeakers table
    await query(
      'UPDATE GuestSpeakers SET SpeakerName = ?, ContributionDescription = ? WHERE EventID = ? AND SpeakerID = ?',
      [UpdatedSpeakerName, UpdatedContributionDescription, eventId, guestSpeakerId]
    );

    // Update the CommonAttributes table with the updated information
    await query(
      'UPDATE CommonAttributes SET UpdatedByUserID = ? WHERE AttributeID = (SELECT CommonAttributeID FROM GuestSpeakers WHERE EventID = ? AND SpeakerID = ?)',
      [UserID, eventId, guestSpeakerId]
    );

    res.json({ success: true, message: 'Guest speaker updated successfully' });
  } catch (error) {
    console.error('Error updating guest speaker:', error);
    res.status(500).json({ success: false, error: 'Error updating guest speaker' });
  }
}

module.exports = {
  editGuestSpeaker,
};
