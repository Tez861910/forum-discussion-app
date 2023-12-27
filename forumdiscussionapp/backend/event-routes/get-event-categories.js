const { query } = require('../db');

async function getEventCategories(req, res) {
    try {
      const categories = await query('SELECT * FROM EventCategories');
      res.json({ success: true, categories });
    } catch (error) {
      console.error('Error fetching event categories:', error);
      res.status(500).json({ success: false, error: 'Error fetching event categories' });
    }
  }

module.exports = {
    getEventCategories,
};
