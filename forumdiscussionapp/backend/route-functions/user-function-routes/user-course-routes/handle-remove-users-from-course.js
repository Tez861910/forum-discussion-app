const { query } = require('../../../db');

async function handleRemoveUsersFromCourse(req, res) {
  const deletedByUserID = req.user.id; 

  try {
    const courseId = req.params.courseId;
    const userIds = req.body.userIds;

    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
      return res.status(400).json({ error: 'Invalid or empty user IDs provided' });
    }

    // Get CommonAttributeID for marking deletions
    const commonAttributeSql = 'SELECT AttributeID FROM commonattributes WHERE IsDeleted = false LIMIT 1';
    const [commonAttributeResult] = await query(commonAttributeSql);

    if (!commonAttributeResult || commonAttributeResult.length === 0) {
      return res.status(500).json({ error: 'No available CommonAttributeID for marking deletions' });
    }

    const commonAttributeId = commonAttributeResult[0].AttributeID;

    const updateSql = 'UPDATE UserCourses ' +
      'SET CommonAttributeID = ?, DeletedAt = CURRENT_TIMESTAMP, IsDeleted = TRUE, DeletedByUserID = ? ' +
      'WHERE UserID IN (?) AND CourseID = ?';

    const updateResult = await query(updateSql, [commonAttributeId, deletedByUserID, userIds, courseId]);

    if (updateResult.affectedRows === 0) {
      return res.status(404).json({ error: 'Enrollment not found or already removed' });
    }

    console.log(`Users removed from the course ${courseId}.`);

    res.json({ message: 'Users removed from the course successfully' });
  } catch (error) {
    console.error('Error removing users from course:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  handleRemoveUsersFromCourse,
};
