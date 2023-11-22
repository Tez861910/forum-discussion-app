const express = require('express');
const router = express.Router();
const { query } = require('../db');
const { accessToken, verifyJwt } = require('../authvalid');

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
router.get('/events',  async (req, res) => {
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
