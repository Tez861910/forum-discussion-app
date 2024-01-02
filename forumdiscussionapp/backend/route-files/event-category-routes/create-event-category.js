const { query } = require('../../db');

async function createEventCategory(req, res) {
  try {
    const { CategoryName } = req.body;
    const UserID = req.user.userId;

    // Insert into CommonAttributes table to get AttributeID
    const commonAttributesQuery = 'INSERT INTO CommonAttributes (CreatedByUserID) VALUES (?)';
    const commonAttributesValues = [UserID];

    const commonAttributesResult = await query(commonAttributesQuery, commonAttributesValues);

    // Extract AttributeID from the result
    const commonAttributeID = commonAttributesResult.insertId;

    // Insert into EventCategories table using CommonAttributeID
    const eventCategoryQuery = 'INSERT INTO EventCategories (CategoryName, CommonAttributeID) VALUES (?, ?)';
    const eventCategoryValues = [CategoryName, commonAttributeID];

    const result = await query(eventCategoryQuery, eventCategoryValues);

    res.status(201).json({ success: true, message: 'Event category created successfully', categoryId: result.insertId });
  } catch (error) {
    console.error('Error creating event category:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
}

module.exports = {
  createEventCategory,
};
