const { query } = require('../db');

const handleCoursesEnrollmentsId = async (req, res) => {
    try {
      const courseId = req.params.courseId;
      const sql = 'SELECT users.UserName FROM users JOIN usercourses ON users.UserID = usercourses.UserID WHERE usercourses.CourseID = ?';
      const [enrollmentsResult] = await query(sql, [courseId]);
  
      res.json({ enrollments: enrollmentsResult });
    } catch (error) {
      console.error('Error fetching course enrollments:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  module.exports = {
    handleCoursesEnrollmentsId,
  };