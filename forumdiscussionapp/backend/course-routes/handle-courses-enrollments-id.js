const { query } = require('../db');

const handleCoursesEnrollmentsId = async (req, res) => {
  const courseId = req.params.courseId;
  console.log('Received courseId:', courseId);

  try {
    if (!query) {
      throw new Error('Database connection not established or query function not defined.');
    }

    const sql = `
      SELECT
        users.UserID,
        users.UserName
      FROM
        users
      JOIN
        usercourses ON users.UserID = usercourses.UserID
      WHERE
        usercourses.CourseID = ? AND usercourses.IsDeleted = FALSE;
    `;
    console.log('SQL Query:', sql);

    const rows = await query(sql, [parseInt(courseId, 10)]);

    console.log('Query Result:', rows);

    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: 'No enrollments found for the course' });
    }

    const enrollmentsResult = {};
    rows.forEach(row => {
      const { UserID, UserName } = row;
      if (!enrollmentsResult[UserID]) {
        enrollmentsResult[UserID] = [];
      }
      enrollmentsResult[UserID].push({ UserID, UserName });
    });

    res.json({ enrollments: enrollmentsResult });
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  handleCoursesEnrollmentsId,
};
