const { query } = require('../db');

async function handleCIDEnrollmentsEID(req, res) {
  try {
    const courseId = req.params.courseId;
    const userId = req.params.userId;

    const updateSql = 'UPDATE UserCourses SET IsDeleted = TRUE WHERE UserID = ? AND CourseID = ?';
    const updateResult = await query(updateSql, [userId, courseId]);

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
