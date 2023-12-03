const { query } = require('../db');

async function handleUserCoursesGet(req, res) {
  try {
    const userIds = req.body.userIds;

// Validate userIds
if (!userIds || userIds.length === 0) {
  throw new Error('Invalid user IDs provided');
}

    // Dynamically generate placeholders for the IN clause
    const userCoursesQuery = `SELECT * FROM UserCourses WHERE UserID IN (${userIds.map(() => '?').join(', ')})`;
    const userCourses = await query(userCoursesQuery, userIds);

    res.json({ userCourses });
  } catch (error) {
    console.error('Error fetching user courses:', error);
    res.status(500).json({ error: 'Error fetching user courses. Please try again later.' });
  }
}

module.exports = {
  handleUserCoursesGet,
};
