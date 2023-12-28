const { query } = require('../db');

async function handleCIDEnrollmentsEID(req, res) {
  const deletedByUserID = req.user.id; 

  try {
    const courseId = req.params.courseId;
    const userId = req.params.userId;

    // Get CommonAttributeID for marking deletions
    const commonAttributeSql = 'SELECT AttributeID FROM commonattributes WHERE IsDeleted = false LIMIT 1';
    const [commonAttributeResult] = await query(commonAttributeSql);

    if (!commonAttributeResult || commonAttributeResult.length === 0) {
      return res.status(500).json({ error: 'No available CommonAttributeID for marking deletions' });
    }

    const commonAttributeId = commonAttributeResult[0].AttributeID;

    const updateSql = 'UPDATE UserCourses ' +
      'SET CommonAttributeID = ?, DeletedAt = CURRENT_TIMESTAMP, IsDeleted = TRUE, DeletedByUserID = ? ' +
      'WHERE UserID = ? AND CourseID = ?';
    const updateResult = await query(updateSql, [commonAttributeId, deletedByUserID, userId, courseId]);

    if (updateResult.affectedRows === 0) {
      return res.status(404).json({ error: 'Enrollment not found or already removed' });
    }

    console.log(`User ${userId} soft-deleted from the course ${courseId}.`);

    res.json({ message: 'User removed from the course successfully' });
  } catch (error) {
    console.error('Error removing user from course:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  handleCIDEnrollmentsEID,
};
