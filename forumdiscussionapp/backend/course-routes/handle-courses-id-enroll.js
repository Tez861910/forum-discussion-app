const { query } = require('../db');

const handleCoursesIdEnroll = async (req, res) => {

  try {
    const { userName } = req.body;
    const courseId = req.params.courseId;

    // Check if the user exists
    const userSql = 'SELECT UserID FROM users WHERE UserName = ?';
    const userResult = await query(userSql, [userName]);
    console.log('User Result:', userResult);

    if (!userResult || userResult.length === 0 || !userResult[0] || !userResult[0].UserID) {
      return res.status(404).json({ error: 'User not found' });
    }
    

    const userId = userResult[0].UserID;

    // Check if the user is already enrolled in the course
    const existingEnrollmentSql = 'SELECT UserCourseID FROM usercourses WHERE UserID = ? AND CourseID = ?';
    const [existingEnrollmentResult] = await query(existingEnrollmentSql, [userId, courseId]);

    // Check if the enrollment already exists
    if (existingEnrollmentResult && existingEnrollmentResult.length > 0) {
      return res.status(400).json({ error: 'User is already enrolled in the course' });
    }

    // Enroll the user in the course
    const enrollSql = 'INSERT INTO usercourses (UserID, CourseID) VALUES (?, ?)';
    await query(enrollSql, [userId, courseId]);

    res.json({ message: 'User enrolled in the course successfully' });
  } catch (error) {
    console.error('Error enrolling user in course:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

module.exports = {
  handleCoursesIdEnroll,
};
