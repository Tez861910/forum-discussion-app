const { query } = require('../db');

// Endpoint to edit an event
async function editEvent(req, res) {
  try {
    const { eventId } = req.params;
    const { EventTitle, EventDescription, EventDate } = req.body;
    const CourseID = req.user.courseId;
    const UserID = req.user.userId;

    // Check if the event is marked as deleted in CommonAttributes
    const isEventDeleted = await query(
      'SELECT IsDeleted FROM CommonAttributes WHERE AttributeID = (SELECT CommonAttributeID FROM Events WHERE EventID = ?)',
      [eventId]
    );

    if (isEventDeleted[0].IsDeleted) {
      // If the event is marked as deleted, return an error
      return res.status(400).json({ success: false, error: 'Cannot edit a deleted event' });
    }

    // Update the event details in the Events table
    await query(
      'UPDATE Events SET EventTitle = ?, EventDescription = ?, EventDate = ?, CourseID = ? WHERE EventID = ?',
      [EventTitle, EventDescription, EventDate, CourseID, eventId]
    );

    // Update the CommonAttributes table with the updated information
    await query(
      'UPDATE CommonAttributes SET UpdatedByUserID = ? WHERE AttributeID = (SELECT CommonAttributeID FROM Events WHERE EventID = ?)',
      [UserID, eventId]
    );

    res.json({ success: true, message: 'Event updated successfully' });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ success: false, error: 'Error updating event' });
  }
}

module.exports = {
  editEvent,
};
