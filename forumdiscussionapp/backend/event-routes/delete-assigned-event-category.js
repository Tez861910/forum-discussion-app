const { query } = require('../db');

// Function to soft delete an assigned event category
async function softDeleteAssignedEventCategory(req, res) {
    try {
      const { eventId, categoryId } = req.params;
      const UserID = req.user.userId;
  
      // Check if the assigned event category is already deleted
      const isAssignedCategoryDeleted = await query(
        'SELECT IsDeleted FROM CommonAttributes WHERE AttributeID = (SELECT CommonAttributeID FROM EventCategoryMapping WHERE EventID = ? AND CategoryID = ?)',
        [eventId, categoryId]
      );
  
      if (isAssignedCategoryDeleted[0].IsDeleted) {
        // If the assigned event category is already marked as deleted, return success (no need to delete again)
        return res.json({ success: true, message: 'Assigned event category already deleted' });
      }
  
      // Update the IsDeleted field in the CommonAttributes table
      await query(
        'UPDATE CommonAttributes SET IsDeleted = true, UpdatedByUserID = ? WHERE AttributeID = (SELECT CommonAttributeID FROM EventCategoryMapping WHERE EventID = ? AND CategoryID = ?)',
        [UserID, eventId, categoryId]
      );
  
      res.json({ success: true, message: 'Assigned event category soft deleted successfully' });
    } catch (error) {
      console.error('Error soft deleting assigned event category:', error);
      res.status(500).json({ success: false, error: 'Error soft deleting assigned event category' });
    }
  }
  
  module.exports = {
    softDeleteAssignedEventCategory,
  };