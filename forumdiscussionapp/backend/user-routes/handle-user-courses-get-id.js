const { query } = require('../db');

async function handleUserCoursesGetId(req, res) {
  try {
    const userId = req.query.userId;

    // Validate userId
    if (!userId) {
      throw new Error('Invalid user ID provided');
    }

    // Query to retrieve courses for a specific user
    const userCoursesQuery = 'SELECT * FROM UserCourses WHERE UserID = ?';
    const userCourses = await query(userCoursesQuery, [userId]);

    res.json({ userCourses });
  } catch (error) {
    console.error('Error fetching user courses:', error);
    res.status(500).json({ error: 'Error fetching user courses. Please try again later.' });
  }
}

module.exports = {
  handleUserCoursesGetId,
};
