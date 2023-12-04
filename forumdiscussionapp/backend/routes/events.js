const express = require('express');
const router = express.Router();
const { query } = require('../db');
const { verifyJwt } = require('../authvalid');
router.use(express.json());

// Endpoint to create an event
router.post('/events/create', verifyJwt, async (req, res) => {
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
  
      res.json({ success: true, message: 'Event created successfully' });
    } catch (error) {
      console.error('Error creating event:', error);
      res.status(500).json({ success: false, error: 'Error creating event' });
    }
  });
  

// Endpoint to get all events
router.get('/events/get', verifyJwt, async (req, res) => {
    try {
      const UserID = req.user.userId;
  
      const events = await query('SELECT * FROM Events WHERE UserID = ?', [UserID]);
  
      res.json({ success: true, events });
    } catch (error) {
      console.error('Error fetching events:', error);
      res.status(500).json({ success: false, error: 'Error fetching events' });
    }
  });

// Endpoint to edit an event
router.put('/events/edit/:eventId', verifyJwt, async (req, res) => {
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
  });

// Endpoint to delete an event
router.delete('/events/delete/:eventId', verifyJwt, async (req, res) => {
    try {
      const { eventId } = req.params;
  
      await query(
        'DELETE FROM Events WHERE EventID = ?',
        [eventId]
      );
  
      res.json({ success: true, message: 'Event deleted successfully' });
    } catch (error) {
      console.error('Error deleting event:', error);
      res.status(500).json({ success: false, error: 'Error deleting event' });
    }
  });

module.exports = router;
