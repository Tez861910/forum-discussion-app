const { query } = require('../db');

// Endpoint to create an event
async function createEvent(req, res) {
  try {
    const { EventTitle, EventDescription, EventDate } = req.body;
    const UserID = req.user.userId;
    const CourseID = req.user.courseId;

    let result;

    if (CourseID) {
      result = await query(
        'INSERT INTO Events (EventTitle, EventDescription, EventDate, UserID, CourseID) VALUES (?, ?, ?, ?, ?)',
        [EventTitle, EventDescription, EventDate, UserID, CourseID]
      );
    } else {
      result = await query(
        'INSERT INTO Events (EventTitle, EventDescription, EventDate, UserID) VALUES (?, ?, ?, ?)',
        [EventTitle, EventDescription, EventDate, UserID]
      );
    }

    // Assuming you want to send a response back to the client
    res.status(201).json({ message: 'Event created successfully', eventId: result.insertId });
  } catch (error) {
    console.error('Error creating event:', error);
    // Handle the error and send an appropriate response to the client
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  createEvent,
};
