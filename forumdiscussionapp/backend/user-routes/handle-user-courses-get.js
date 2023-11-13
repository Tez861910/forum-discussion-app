const { query } = require('../db');


async function handleUserCoursesGet(req, res) {
  try {
    const userIds = req.body.userIds; 
    const userCoursesQuery = `SELECT * FROM UserCourses WHERE UserID IN (?)`;
    const userCourses = await query(userCoursesQuery, [userIds]);

    res.json({ userCourses });
  } catch (error) {
    console.error('Error fetching user courses:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  handleUserCoursesGet,
};
