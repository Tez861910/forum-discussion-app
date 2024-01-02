const { query } = require('../../db');

// Function to soft delete an event category
async function softDeleteEventCategory(req, res) {
    try {
      const { categoryId } = req.params;
      const UserID = req.user.userId;
  
      // Check if the event category is already deleted
      const isCategoryDeleted = await query(
        'SELECT IsDeleted FROM CommonAttributes WHERE AttributeID = (SELECT CommonAttributeID FROM EventCategories WHERE CategoryID = ?)',
        [categoryId]
      );
  
      if (isCategoryDeleted[0].IsDeleted) {
        // If the event category is already marked as deleted, return success (no need to delete again)
        return res.json({ success: true, message: 'Event category already deleted' });
      }
  
      // Update the IsDeleted field in the CommonAttributes table
      await query(
        'UPDATE CommonAttributes SET IsDeleted = true, UpdatedByUserID = ? WHERE AttributeID = (SELECT CommonAttributeID FROM EventCategories WHERE CategoryID = ?)',
        [UserID, categoryId]
      );
  
      res.json({ success: true, message: 'Event category soft deleted successfully' });
    } catch (error) {
      console.error('Error soft deleting event category:', error);
      res.status(500).json({ success: false, error: 'Error soft deleting event category' });
    }
  }
  
  module.exports = {
    softDeleteEventCategory,
  };