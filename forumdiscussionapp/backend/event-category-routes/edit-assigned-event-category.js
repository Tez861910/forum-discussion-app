const { query } = require('../db');

// Function to edit an assigned event category
async function editAssignedEventCategory(req, res) {
    try {
      const { eventId, categoryId } = req.params;
      const { UpdatedCategoryName } = req.body;
      const UserID = req.user.userId;
  
      // Update the CategoryName in the EventCategoryMapping table
      await query(
        'UPDATE EventCategoryMapping SET UpdatedCategoryName = ? WHERE EventID = ? AND CategoryID = ?',
        [UpdatedCategoryName, eventId, categoryId]
      );
  
      // Update the CommonAttributes table with the updated information
      await query(
        'UPDATE CommonAttributes SET UpdatedByUserID = ? WHERE AttributeID = (SELECT CommonAttributeID FROM EventCategoryMapping WHERE EventID = ? AND CategoryID = ?)',
        [UserID, eventId, categoryId]
      );
  
      res.json({ success: true, message: 'Assigned event category updated successfully' });
    } catch (error) {
      console.error('Error updating assigned event category:', error);
      res.status(500).json({ success: false, error: 'Error updating assigned event category' });
    }
  }

  module.exports = {
    editAssignedEventCategory,
  };