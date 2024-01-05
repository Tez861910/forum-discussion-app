const { query } = require('../../../db');

async function getRecurringEvents(req, res) {
    try {
      const { eventId } = req.params;
      const recurringEvents = await query('SELECT * FROM RecurringEvents WHERE EventID = ?', [eventId]);
      res.json({ success: true, recurringEvents });
    } catch (error) {
      console.error('Error fetching recurring events:', error);
      res.status(500).json({ success: false, error: 'Error fetching recurring events' });
    }
  }

module.exports = {
    getRecurringEvents,
};
