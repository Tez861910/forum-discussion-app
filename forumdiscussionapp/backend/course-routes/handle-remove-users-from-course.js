const { query } = require('../db');

async function handleRemoveUsersFromCourse(req, res) {
  try {
    const courseId = req.params.courseId;
    const userIds = req.body.userIds;

    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
      return res.status(400).json({ error: 'Invalid or empty user IDs provided' });
    }

    const updateSql = 'UPDATE UserCourses SET IsDeleted = TRUE WHERE UserID IN (?) AND CourseID = ?';
    const updateResult = await query(updateSql, [userIds, courseId]);

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