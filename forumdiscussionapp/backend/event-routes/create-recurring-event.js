const { query } = require('../db');

async function createRecurringEvent(req, res) {
    try {
      const { eventId } = req.params;
      const { RecurrenceType, RecurrenceInterval } = req.body;
  
      await query(
        'INSERT INTO RecurringEvents (EventID, RecurrenceType, RecurrenceInterval) VALUES (?, ?, ?)',
        [eventId, RecurrenceType, RecurrenceInterval]
      );
  
      res.status(201).json({ success: true, message: 'Recurring event created successfully' });
    } catch (error) {
      console.error('Error creating recurring event:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }

module.exports = {
    createRecurringEvent,
};
