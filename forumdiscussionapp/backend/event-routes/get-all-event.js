const { query } = require('../db');

// Endpoint to get all events
async function getAllEvents(req, res) {
    try {
      const UserID = req.user.userId;
  
      const events = await query('SELECT * FROM Events WHERE UserID = ?', [UserID]);
  
      res.json({ success: true, events });
    } catch (error) {
      console.error('Error fetching events:', error);
      res.status(500).json({ success: false, error: 'Error fetching events' });
    }
  }

module.exports = {
    getAllEvents,
};
