const { query } = require('../db');

// Endpoint to edit an event
async function editEvent(req, res) {
    try {
      const { eventId } = req.params;
      const { EventTitle, EventDescription, EventDate } = req.body;
      const CourseID = req.user.courseId;
  
      await query(
        'UPDATE Events SET EventTitle = ?, EventDescription = ?, EventDate = ?, CourseID = ? WHERE EventID = ?',
        [EventTitle, EventDescription, EventDate, CourseID, eventId]
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
