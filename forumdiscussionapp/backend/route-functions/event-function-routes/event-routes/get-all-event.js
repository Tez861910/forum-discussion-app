const { query } = require('../../../db');

// Endpoint to get all events
async function getAllEvents(req, res) {
  try {
    const UserID = req.user.userId;

    // Selecting relevant fields from both Events and CommonAttributes tables
    const events = await query(`
      SELECT E.*, CA.CreatedAt, CA.CreatedByUserID, CA.IsDeleted
      FROM Events AS E
      JOIN CommonAttributes AS CA ON E.CommonAttributeID = CA.AttributeID
      WHERE E.UserID = ? AND CA.IsDeleted = false
    `, [UserID]);

    res.json({ success: true, events });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ success: false, error: 'Error fetching events' });
  }
}

module.exports = {
  getAllEvents,
};
