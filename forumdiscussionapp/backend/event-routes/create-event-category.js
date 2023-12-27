const { query } = require('../db');

async function createEventCategory(req, res) {
    try {
      const { CategoryName } = req.body;
  
      const result = await query('INSERT INTO EventCategories (CategoryName) VALUES (?)', [CategoryName]);
  
      res.status(201).json({ success: true, message: 'Event category created successfully', categoryId: result.insertId });
    } catch (error) {
      console.error('Error creating event category:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }

module.exports = {
    createEventCategory,
};
