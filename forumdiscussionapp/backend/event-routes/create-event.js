const { query } = require('../db');

// Endpoint to create an event
async function createEvent(req, res) {
  try {
    // Destructure relevant information from the request body
    const { EventTitle, EventDescription, EventDate, Location } = req.body;
    
    // Extract user information from the request (assuming it comes from authentication middleware)
    const UserID = req.user.userId;
    const CourseID = req.user.courseId;

    let commonAttributesResult;

    // Insert into CommonAttributes table to get AttributeID
    const commonAttributesQuery = 'INSERT INTO CommonAttributes (CreatedByUserID) VALUES (?)';
    const commonAttributesValues = [UserID];

    commonAttributesResult = await query(commonAttributesQuery, commonAttributesValues);

    // Extract AttributeID from the result
    const commonAttributeID = commonAttributesResult.insertId;

    let eventsResult;

    // Check if CourseID is provided (if the event is associated with a course)
    if (CourseID) {
      // Insert into Events table using CommonAttributeID
      const eventsQuery =
        'INSERT INTO Events (EventTitle, EventDescription, EventDate, Location, UserID, CourseID, CommonAttributeID) VALUES (?, ?, ?, ?, ?, ?, ?)';
      const eventsValues = [EventTitle, EventDescription, EventDate, Location, UserID, CourseID, commonAttributeID];

      eventsResult = await query(eventsQuery, eventsValues);
    } else {
      // If no CourseID provided, insert the event without linking it to a course
      // Insert into Events table using CommonAttributeID
      const eventsQuery =
        'INSERT INTO Events (EventTitle, EventDescription, EventDate, Location, UserID, CommonAttributeID) VALUES (?, ?, ?, ?, ?, ?)';
      const eventsValues = [EventTitle, EventDescription, EventDate, Location, UserID, commonAttributeID];

      eventsResult = await query(eventsQuery, eventsValues);
    }

    // Assuming you want to send a response back to the client
    res.status(201).json({ message: 'Event created successfully', eventId: eventsResult.insertId });
  } catch (error) {
    // Handle errors gracefully
    console.error('Error creating event:', error);
    
    // Send an appropriate response to the client
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  createEvent,
};
