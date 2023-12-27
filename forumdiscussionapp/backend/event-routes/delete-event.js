const { query } = require('../db');

// Endpoint to delete an event
async function deleteEvent(req, res) {
    try {
      const { eventId } = req.params;
  
      await query('DELETE FROM Events WHERE EventID = ?', [eventId]);
  
      res.json({ success: true, message: 'Event deleted successfully' });
    } catch (error) {
      console.error('Error deleting event:', error);
      res.status(500).json({ success: false, error: 'Error deleting event' });
    }
  }

module.exports = {
    deleteEvent,
};
