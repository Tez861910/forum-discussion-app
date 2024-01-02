const { query } = require('../../db');

async function assignEventCategory(req, res) {
  try {
    const { eventId, categoryId } = req.params;
    const UserID = req.user.userId;

    // Insert into CommonAttributes table to get AttributeID
    const commonAttributesQuery = 'INSERT INTO CommonAttributes (CreatedByUserID) VALUES (?)';
    const commonAttributesValues = [UserID];

    const commonAttributesResult = await query(commonAttributesQuery, commonAttributesValues);

    // Extract AttributeID from the result
    const commonAttributeID = commonAttributesResult.insertId;

    // Insert into EventCategoryMapping table using CommonAttributeID
    const eventCategoryMappingQuery = 'INSERT INTO EventCategoryMapping (EventID, CategoryID, CommonAttributeID) VALUES (?, ?, ?)';
    const eventCategoryMappingValues = [eventId, categoryId, commonAttributeID];

    await query(eventCategoryMappingQuery, eventCategoryMappingValues);

    res.json({ success: true, message: 'Event category assigned successfully' });
  } catch (error) {
    console.error('Error assigning event category:', error);
    res.status(500).json({ success: false, error: 'Error assigning event category' });
  }
}

module.exports = {
  assignEventCategory,
};
