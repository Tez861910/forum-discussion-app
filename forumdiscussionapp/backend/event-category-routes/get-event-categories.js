const { query } = require('../db');

async function getEventCategories(req, res) {
  try {
    // Selecting relevant fields from both EventCategories and CommonAttributes tables
    const categories = await query(`
      SELECT EC.*, CA.IsDeleted
      FROM EventCategories AS EC
      JOIN CommonAttributes AS CA ON EC.CommonAttributeID = CA.AttributeID
      WHERE CA.IsDeleted = false
    `);

    res.json({ success: true, categories });
  } catch (error) {
    console.error('Error fetching event categories:', error);
    res.status(500).json({ success: false, error: 'Error fetching event categories' });
  }
}

module.exports = {
  getEventCategories,
};
