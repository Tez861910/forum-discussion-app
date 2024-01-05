const { query } = require('../../../db');

async function createReminder(req, res) {
    try {
      const { eventId } = req.params;
      const { ReminderTime } = req.body;
  
      await query('INSERT INTO Reminders (EventID, ReminderTime) VALUES (?, ?)', [eventId, ReminderTime]);
  
      res.status(201).json({ success: true, message: 'Reminder created successfully' });
    } catch (error) {
      console.error('Error creating reminder:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }

module.exports = {
    createReminder,
};
