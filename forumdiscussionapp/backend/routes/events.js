const express = require('express');
const router = express.Router();
const { query } = require('../db');

// Endpoint to create an event
router.post('/events/create', async (req, res) => {
    try {
      const { EventTitle, EventDescription, EventDate, CourseID } = req.body;
      const UserID = req.user.id;
  
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
router.get('/events/get',  async (req, res) => {
    try {
      
  
      const events = await query('SELECT * FROM Events', [UserID]);
  
      res.json({ success: true, events });
    } catch (error) {
      console.error('Error fetching events:', error);
      res.status(500).json({ success: false, error: 'Error fetching events' });
    }
  });

// Endpoint to edit an event
router.put('/events/edit/:eventId', async (req, res) => {
    try {
      const { eventId } = req.params;
      const { EventTitle, EventDescription, EventDate, CourseID } = req.body;
  
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
router.delete('/events/delete/:eventId', async (req, res) => {
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
