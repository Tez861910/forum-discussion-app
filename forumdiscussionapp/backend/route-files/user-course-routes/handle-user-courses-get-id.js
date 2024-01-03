const { query } = require('../../db');

async function handleUserCoursesGetId(req, res) {
  try {
    const userId = req.query.userId;

    // Validate userId
    if (!userId) {
      throw new Error('Invalid user ID provided');
    }

    // Assuming CommonAttributes table has an IsDeleted column
    const userCoursesQuery = `
      SELECT uc.*
      FROM UserCourses uc
      INNER JOIN CommonAttributes ca ON uc.CommonAttributeID = ca.AttributeID
      WHERE uc.UserID = ? AND ca.IsDeleted = FALSE
    `;

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
