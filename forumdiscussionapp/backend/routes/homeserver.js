const express = require('express');
const router = express.Router();
const { query } = require('../db');
const { accessToken, verifyJwt } = require('../authvalid');

// Endpoint to create a new event
router.post('/events/create', verifyJwt, async (req, res) => {
  try {
    const { EventTitle, EventDescription, EventDate, CourseID } = req.body;
    const UserID = req.user.id;

    const result = await query(
      'INSERT INTO Events (EventTitle, EventDescription, EventDate, UserID, CourseID) VALUES (?, ?, ?, ?, ?)',
      [EventTitle, EventDescription, EventDate, UserID, CourseID]
    );

    res.json({ success: true, message: 'Event created successfully' });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ success: false, error: 'Error creating event' });
  }
});

// Endpoint to get all events
router.get('/events', verifyJwt, async (req, res) => {
  try {
    const UserID = req.user.id;

    const events = await query('SELECT * FROM Events WHERE UserID = ?', [UserID]);

    res.json({ success: true, events });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ success: false, error: 'Error fetching events' });
  }
});

// Endpoint to refresh access token
router.post('/refresh-token', verifyJwt, async (req, res) => {
  try {
    const newAccessToken = accessToken(req.user);

    res.json({ success: true, accessToken: newAccessToken });
  } catch (error) {
    console.error('Token refresh failed:', error);
    res.status(401).json({ error: 'Token refresh failed' });
  }
});

module.exports = router;
