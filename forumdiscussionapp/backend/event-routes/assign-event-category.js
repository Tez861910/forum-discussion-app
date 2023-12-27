const { query } = require('../db');

async function assignEventCategory(req, res) {
    try {
      const { eventId, categoryId } = req.params;
  
      await query('INSERT INTO EventCategoryMapping (EventID, CategoryID) VALUES (?, ?)', [eventId, categoryId]);
  
      res.json({ success: true, message: 'Event category assigned successfully' });
    } catch (error) {
      console.error('Error assigning event category:', error);
      res.status(500).json({ success: false, error: 'Error assigning event category' });
    }
  }

module.exports = {
    assignEventCategory,
};
