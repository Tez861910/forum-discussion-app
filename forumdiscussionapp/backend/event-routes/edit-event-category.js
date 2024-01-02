const { query } = require('../db');

// Function to edit an event category
async function editEventCategory(req, res) {
  try {
    const { categoryId } = req.params;
    const { CategoryName } = req.body;
    const UserID = req.user.userId;

    // Update the CategoryName in the EventCategories table
    await query(
      'UPDATE EventCategories SET CategoryName = ? WHERE CategoryID = ?',
      [CategoryName, categoryId]
    );

    // Update the CommonAttributes table with the updated information
    await query(
      'UPDATE CommonAttributes SET UpdatedByUserID = ? WHERE AttributeID = (SELECT CommonAttributeID FROM EventCategories WHERE CategoryID = ?)',
      [UserID, categoryId]
    );

    res.json({ success: true, message: 'Event category updated successfully' });
  } catch (error) {
    console.error('Error updating event category:', error);
    res.status(500).json({ success: false, error: 'Error updating event category' });
  }
}

module.exports = {
    editEventCategory,
  };