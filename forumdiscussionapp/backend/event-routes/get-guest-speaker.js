const { query } = require('../db');

async function getGuestSpeakers(req, res) {
    try {
      const { eventId } = req.params;
      const guestSpeakers = await query('SELECT * FROM GuestSpeakers WHERE EventID = ?', [eventId]);
      res.json({ success: true, guestSpeakers });
    } catch (error) {
      console.error('Error fetching guest speakers:', error);
      res.status(500).json({ success: false, error: 'Error fetching guest speakers' });
    }
  }

module.exports = {
    getGuestSpeakers,
};